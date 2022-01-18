module.exports = {
  _comments: {
    large_header: "Toggles the size of the top banner.",
    show_in_navigation: "Toggles a link in the top banner.",
    author_staff_member: "The staff member writing this post.",
    call_to_action: "Type of request shown at the bottom of this page.",
    testimonials: "Update, add or remove testimonials.",
    role: "Shown as subtext on leadership team member summaries.",
    contactEmailAddress: "Address for the contact form to send to.",
    new_window: "Whether the link opens a new browser tab/window."
  },

  _select_data: {
    call_to_actions: ["Contact", "Blog"],
    social_icons: [
      "Facebook",
      "Instagram",
      "LinkedIn",
      "Pinterest",
      "Tumblr",
      "Twitter",
      "YouTube",
      "RSS"
    ]
  },

  paths: {
    collections: "content",
    data: "data",
    static: "public",
    uploads: "public/uploads"
  },

  "collections-config": {
    webpages: {
      path: "content/pages",
      url: "/[slug]",
      output: true,
      name: "Pages",
      _icon: "wysiwyg",
      _enabled_editors: ["visual", "data"]
    },
    posts: {
      path: "content/posts",
      url: "/blog/[slug]",
      output: true,
      _enabled_editors: ["visual", "content", "data"]
    },
    leadership_team: {
      path: "content/leadership-team",
      output: false,
      _icon: "people"
    },
    data: {
      path: "data",
      output: false
    }
  }
};
