# Usage

## neovim

1. Manually add the parser to your nvim config:

   ```lua
   require("nvim-treesitter.parsers").get_parser_configs().scfg = {
   	install_info = {
   		url = "https://git.sr.ht/~rockorager/tree-sitter-scfg",
   		files = {"src/parser.c"},
   	},
   	filetype = "scfg",
   	requires_generate_from_grammar = true,
   }

   -- register the filetype, this is not built in to neovim

   vim.filetype.add({
   	extension = {
   		scfg = "scfg",
   	}
   })
   ```

2. Link or copy `queries/highlights.scm` to
   `$XDG_CONFIG_HOME/nvim/queries/scfg/highlights.scm`
3. Open nvim, and run :TSInstall scfg

# Contributing

Patches or issues can be sent to
[~rockorager/public-inbox@lists.sr.ht](mailto:~rockorager/public-inbox@lists.sr.ht)
