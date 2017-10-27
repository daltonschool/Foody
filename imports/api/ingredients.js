import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Ingredients = new Mongo.Collection('ingredients');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish ingredients that are public or belong to the current user
    Meteor.publish('ingredients', function ingredientsPublication() {
        return Ingredients.find({});
    });
}

Meteor.methods({
    'ingredients.insert'(item) {
        check(item.name, String);

        // Make sure the user is logged in before inserting a ingredient
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Ingredients.insert({
            name: item.name,
            createdAt: new Date()
        });
    },
    'ingredients.remove'(ingredientId) {
        check(ingredientId, String);

        const ingredient = Ingredients.findOne(ingredientId);
        if (ingredient.owner !== this.userId) {
            // If the ingredient is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Ingredients.remove(ingredientId);
    }
});
