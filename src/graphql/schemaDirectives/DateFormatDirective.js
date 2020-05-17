const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver, GraphQLString } = require('graphql');
const moment = require('moment-timezone');

module.exports = class DateFormatDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { format } = this.args;

    // The formatted Date becomes a String, so the field type must change:
    field.type = GraphQLString;

    field.resolve = async function(...args) {
      const result = await resolve.apply(this, args);
      let dateValue = 0;
      if (typeof result === 'string') {
        dateValue = parseInt(result, 10);
      }
      if (typeof result === 'number') {
        dateValue = result;
      }
      if (dateValue === 0) {
        return null;
      }
      const date = moment(new Date(dateValue));
      return date.format(format);
    };
  }
};
