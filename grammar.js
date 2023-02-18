const LF = /\x0A/,
  // space, tab
  WSP = /[\x20, \x09/]/,
  // any Unicode code point, excluding CTL, DQUOTE, "\", LF, "'", "{", "}", WSP
  ACHAR = /[^\x00-\x1F\x7F"\\\x0A'{}\x20\x09]/,
  // any Unicode code point, excluding CTL, DQUOTE, "\", LF
  DQCHAR = /[^\x00-\x1F\x7F"\\\x0A]/,
  // any Unicode code point, excluding CTL, "'", LF
  SQCHAR = /[^\x00-\x1F\x7F'\x0A]/,
  // any Unicode code point, excluding CTL, LF
  VCHAR = /[^\x00-\x1F\x7F\x0A]/;

module.exports = grammar({
  name: "scfg",

  rules: {
    config: ($) => repeat(choice($.directive, $.comment)),

    comment: ($) => seq("#", repeat($.word), $._newline),

    directive: ($) =>
      seq(
        $.directive_name,
        optional($.directive_params),
        optional($.block),
        $._newline
      ),

    directive_name: ($) => $.word,

    directive_params: ($) => seq($.word, repeat($.word)),

    block: ($) => seq("{", $._newline, repeat1($.directive), "}"),

    word: ($) => choice($._atom, $._dquote_word, $._squote_word),

    _atom: ($) => token(repeat1(choice(ACHAR, seq("\\", VCHAR)))),

    _dquote_word: ($) => seq('"', repeat(choice(DQCHAR, $.esc_pair)), '"'),

    _squote_word: ($) => seq("'", repeat(SQCHAR), "'"),

    esc_pair: ($) => seq("\\", VCHAR),

    _newline: ($) => LF,
  },
});
