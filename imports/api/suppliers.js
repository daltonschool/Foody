import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Suppliers = new Mongo.Collection('suppliers');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish suppliers that are public or belong to the current user
    Meteor.publish('suppliers', function suppliersPublication() {
        return Suppliers.find({});
    });
}

Meteor.methods({
    'suppliers.insert'(item) {
        check(item.name, String);
        check(item.offerings, Array);

        // Make sure the user is logged in before inserting a supplier
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Suppliers.insert({
            name: item.name,
            offerings: item.offerings,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'suppliers.remove'(supplierId) {
        check(supplierId, String);

        const supplier = Suppliers.findOne(supplierId);
        if (supplier.owner !== this.userId) {
            // If the supplier is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Suppliers.remove(supplierId);
    }
});
