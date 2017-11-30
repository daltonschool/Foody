import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import fixture from './fixture.js';

export const Recipes = new Mongo.Collection('recipes');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish recipes that are public or belong to the current user
    Meteor.publish('recipes', function recipesPublication() {
        return Recipes.find()
    });

    Meteor.startup(function () {
        if(Recipes.find({}).fetch().length == 0) {
            Recipes.insert(fixture);
        }
    });
}

Meteor.methods({
    'recipes.insert'(item) {
        check(item.name, String);
        check(item.tags, Array);
        check(item.author, String);
        check(item.ingredients, Array);
        check(item.instructions, String);

        // Make sure the user is logged in before inserting a recipe
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Recipes.insert({
            name: item.name,
            tags: item.tags,
            author: item.author,
            ingredients: item.ingredients,
            instructions: item.instructions,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'recipes.remove'(recipeId) {
        check(recipeId, String);

        const recipe = Recipes.findOne(recipeId);
        if (recipe.owner !== this.userId) {
            // If the recipe is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Recipes.remove(recipeId);
    }
});
