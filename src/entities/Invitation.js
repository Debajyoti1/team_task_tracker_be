const { defineEntity, p } = require("@mikro-orm/core");
const BaseEntityProps = require("./BaseEntity");

const Invitation = defineEntity({
  name: "Invitation",

  tableName: "invitations",

  properties: {
    ...BaseEntityProps,

    // "workspace" or "project"
    resourceType: p.enum({
      items: ["workspace", "project"],
      nullable: false,
      fieldName: "resource_type",
    }),

    // UUID of the org or project being invited to
    resourceId: p.uuid({ nullable: false, fieldName: "resource_id" }),

    email: p.string({ length: 255, nullable: false }),

    token: p.text({ nullable: false }),

    status: p.enum({
      items: ["pending", "accepted", "declined", "expired"],
      default: "pending",
    }),

    expiresAt: p.datetime().nullable(true).fieldName("expires_at"),

    invitedBy: () =>
      p.manyToOne("User", {
        fieldName: "invited_by",
        nullable: false,
        inversedBy: "sentInvitations", // matches User.sentInvitations
      }),
  },
});

module.exports = Invitation;