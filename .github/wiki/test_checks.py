import unittest
from unittest.mock import patch

from check_site import ContentLinks, target_for
from review import Hold, check_path, check_text, merge, resolve_pr, risk_patch


class WikiChecks(unittest.TestCase):
    def test_excludes_navigation(self):
        parser = ContentLinks()
        parser.feed('<a href="/old">old</a><main><img src="a.png"/><a href="b.html">b</a></main>')
        self.assertEqual(parser.links, ["a.png", "b.html"])

    def test_resolves_relative_and_url_escaping(self):
        self.assertEqual(target_for("guide/page.html", "../Newplayer/%E4%BE%8B.html?a=1#x"),
                         "Newplayer/例.html")
        self.assertEqual(target_for("guide/page.html", "/"), "")
        self.assertIsNone(target_for("guide/page.html", "https://example.com/path"))
        self.assertIsNone(target_for("guide/page.html", "#section"))

    def test_auto_merge_scope(self):
        self.assertTrue(check_path("guide/术语.md"))
        for path in [".github/workflows/wiki-review.yml", "guide/.private.md", "guide/pay.md",
                     "Newplayer/服务器规则.md", "SUMMARY.md", "guide/img.png"]:
            self.assertFalse(check_path(path), path)
        self.assertTrue(check_text("# 标题\n\n一小段说明。"))
        for text in ["---\nlayout: home\n---", "<script>x</script>", "<<< foo",
                     "{{ value }}", "<MyComponent/>", "javaScript:"]:
            self.assertFalse(check_text(text), text)

    def test_added_risky_text_is_not_delegated(self):
        for diff in ["+请使用 /op", "+[链接](https://example.test)", "+充值说明",
                     "+[new-reference]: //example.test"]:
            self.assertTrue(risk_patch(diff), diff)
        self.assertFalse(risk_patch("-原来的 /op\n+新版表述。"))

    @patch("review.github")
    def test_stale_head_does_not_merge(self, github):
        github.return_value = {
            "state": "open", "draft": False,
            "base": {"ref": "main", "sha": "b" * 40},
            "head": {"sha": "c" * 40, "repo": {"full_name": "ExpertSneeker/CoreagesWiki"}},
            "user": {"id": 43109085},
        }
        with self.assertRaises(Hold):
            resolve_pr(1, "a" * 40, "b" * 40)
        github.assert_called_once_with("/pulls/1")

    @patch.dict("os.environ", {"PR_NUMBER": "1", "REVIEWED_HEAD": "a" * 40,
                               "REVIEWED_BASE": "b" * 40}, clear=True)
    @patch("review.resolve_pr", return_value={"mergeable": True})
    @patch("review.github")
    def test_merge_dispatches_main(self, github, _resolve):
        github.side_effect = [{"merged": True}, None]
        merge()
        self.assertEqual(github.call_args_list[0].args[1]["sha"], "a" * 40)
        self.assertEqual(github.call_args_list[1].args,
                         ("/actions/workflows/deploy.yml/dispatches", {"ref": "main"}, "POST"))


if __name__ == "__main__":
    unittest.main()
