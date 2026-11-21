"""Check the Linux build and references on changed VitePress pages."""
import os
import posixpath
import subprocess
from html.parser import HTMLParser
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urlsplit


class ContentLinks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_main = False
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag == "main":
            self.in_main = True
        attr = {"a": "href", "img": "src"}.get(tag)
        if self.in_main and attr and dict(attrs).get(attr):
            self.links.append(dict(attrs)[attr])

    handle_startendtag = handle_starttag

    def handle_endtag(self, tag):
        if tag == "main":
            self.in_main = False


def git_paths(*args):
    return subprocess.check_output(["git", *args]).decode().rstrip("\0").split("\0")


def target_for(page, link):
    url = urlsplit(link)
    if not url.path or url.scheme or url.netloc:
        return None
    path = unquote(url.path)
    return posixpath.normpath(posixpath.join("/", posixpath.dirname(page), path)).lstrip("/")


def main():
    root = Path(".vitepress/dist")
    files = {p.relative_to(root).as_posix() for p in root.rglob("*") if p.is_file()}
    issues = [f"Build missing {p}" for p in ("index.html", "404.html") if p not in files]
    for entries in (files, git_paths("ls-files", "-z")):
        seen = {}
        for path in sorted(entries):
            for prefix in (path, *(str(p) for p in PurePosixPath(path).parents if str(p) != ".")):
                old = seen.setdefault(prefix.casefold(), prefix)
                if old != prefix:
                    issues.append(f"Case collision: {old} vs {prefix}")
    base = os.environ.get("BASE_SHA", "")
    # Branch smoke runs have no PR base and only check the build/tree.
    changed = git_paths("diff", "--name-only", "--diff-filter=ACMR", "-z", base, "HEAD") if base else []
    for source in changed:
        if not source.endswith(".md") or any(p.startswith(".") for p in PurePosixPath(source).parts):
            continue
        page = source[:-3] + ".html"
        if page not in files:
            issues.append(f"Changed page missing from build: {source}")
            continue
        html = ContentLinks()
        html.feed((root / page).read_text(encoding="utf-8"))
        for link in html.links:
            try:
                target = target_for(page, link)
            except ValueError:
                issues.append(f"{page}: malformed link {link!r}")
                continue
            if target is None:
                continue
            candidates = {target, target + ".html", posixpath.join(target, "index.html")}
            if target.endswith(".md"):
                candidates.add(target[:-3] + ".html")
            if not candidates.intersection(files):
                issues.append(f"{page}: missing local link/image {link!r}")
    for issue in sorted(set(issues)):
        # Never interpolate PR-authored paths into an Actions workflow command.
        print(f"Wiki validation: {issue!r}")
    return 1 if issues else 0


if __name__ == "__main__":
    raise SystemExit(main())
