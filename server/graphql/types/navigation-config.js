"use strict";
module.exports = ({ nexus }) => nexus.objectType({
    name: "NavigationConfig",
    definition(t) {
        t.int("allowedLevels");
        t.nonNull.list.string("additionalFields");
        t.field("contentTypesNameFields", { type: 'ContentTypesNameFields' });
        t.list.field("contentTypes", { type: 'ContentTypes' });
    }
});
//# sourceMappingURL=navigation-config.js.map