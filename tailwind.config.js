module.exports = {
  theme: {
    fontFamily: {
      sans: ["Outfit", "Noto Sans TC", "sans-serif"],
      serif: ["Outfit", "Noto Sans TC"],
      mono: ["Outfit", "Noto Sans TC"],
      display: ["Outfit", "Noto Sans TC"],
      body: ["Outfit", "Noto Sans TC"],
    },
    extend: {
      colors: {
        // ## figma named color
        "numo-white": "#F0F0F0",
        "numo-gray": "#3E3E3E",
        "primary-01": "#81EDB9",
        "primary-02": "#59CC95",
        "special-01-begin": "#94CCB8",
        "special-02-end": "#44AABA",
        "neutral-01": "#616161",
        "neutral-02": "#AEAEB2",
        "neutral-03": "#FFFFFF",
        "neutral-04": "#000000",
        // "error": "#CE5E5E",
        "scsr-primary": "#7188B4",
        "course-primary": "#62A0D9",

        // ## main
        primary: "#81EDB9",
        "primary-content": "#616161", // used neutral-01, reserved
        info: "#AEAEB2", // used neutral-02
        "info-content": "#616161", // reserved, used neutral-01
        disabled: "#AEAEB2", // used neutral-02
        "disabled-content": "#000000", // used neutral-04, reserved
        success: "#59CC95", // used-primary-02
        "success-content": "#F0F0F0", // used numo-white, reserved
        warning: "#FFBE5E",
        "warning-content": "#000000",
        error: "#CE5E5E",
        "error-content": "#F0F0F0", // used numo-white, reserved
        base: "#F0F0F0", // used numo-white
        "base-100": "#AEAEB2", // used neutral-02
        "base-content": "#616161", // used neutral-01

        // submain
        "scsr-primary-content": "#F0F0F0",
        "course-primary-content": "#F0F0F0",
        "system-blue": "#007AFF",
      },
      boxShadow: {
        "numo-light":
          "-5px -5px 15px #FCFCFC, 6px 6px 18px -14px #878787, 7px 6px 7px -6px rgba(0, 0, 0, 0.1)",
        "numo-light-hover":
          "-5px -4px 7px -4px #FFFFFF, 3px 4px 8px -3px rgba(0, 0, 0, 0.32), -5px -5px 15px #FCFCFC, 6px 6px 18px -14px #878787, 7px 6px 7px -6px rgba(0, 0, 0, 0.1)",
        "numo-light-inset":
          "inset -3px -3px 4px rgba(252, 252, 252, 0.7), inset 4px 4px 9px rgba(0, 0, 0, 0.1);",
        "numo-card":
          "7px 6px 7px -6px #0000001C, 6px 6px 18px -14px #878787, -5px -5px 15px 0px #FCFCFC",
        "numo-emboss-card":
          "inset 4px 4px 9px 0px #00000019, inset -3px -3px 4px 0px #FCFCFCB2",
        "numo-modal": "0px 0px 12px 0px rgba(0,0,0,0.26)",
        "numo-icon":
          "5px -5px 10px #FCFCFC, -5px 5px 10px #8787871a, -7px 6px 7px rgba(0, 0, 0, 0.05);",
        "numo-button": "2.5px 3.4px 6.8px -1.7px rgba(0, 0, 0, 0.26)",
        "scrollbar-thumb":
          "6px 2px 4px -2.6px rgba(108,108,108,0.7), -1.6px -1.6px 6.4px -2px rgba(8,8,8,0.3), inset 4.8px 3.2px 7.1px -3.6px #FFFFFF, inset -3px -1px 3px rgba(88,88,88,0.25)",

        "open-nccu-primary":
          "0px 0px 28px 10px #e68cff80, inset 3px 3px 10px #ffffffb3, inset -3px -3px 10px #1693BA;",
        "open-nccu-active-inset":
          "inset -10px -3px 19px #62d99f66, inset 12.4878px 12.4878px 62.439px #89898940;",
        "special-cta-02":
          "0px 0px 16.985px 0px rgba(0, 0, 0, 0.10), 0px 0px 5.226px 0px rgba(218, 218, 218, 0.70), 0px -1.307px 6.533px 0px rgba(209, 209, 209, 0.20) inset",
      },
      flexGrow: {
        2: "2",
      },
      borderRadius: {
        30: "30px",
        circle: "9999px",
      },
      transitionDuration: {
        3000: "3000ms",
      },
      backgroundImage: {
        "open-nccu-special":
          "linear-gradient(93.24deg, #94CCB8 13.26%, #44AABA 82.72%)",
      },
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
      },
    },
  },
};
