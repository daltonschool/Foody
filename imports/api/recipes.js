import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Recipes = new Mongo.Collection('recipes');

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish recipes that are public or belong to the current user
    Meteor.publish('recipes', function recipesPublication() {
        return Recipes.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'recipes.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a recipe
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Recipes.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'recipes.remove'(recipeId) {
        check(recipeId, String);

        const recipe = Recipes.findOne(recipeId);
        if (recipe.private && recipe.owner !== this.userId) {
            // If the recipe is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }

        Recipes.remove(recipeId);
    },
    'recipes.setChecked'(recipeId, setChecked) {
        check(recipeId, String);
        check(setChecked, Boolean);

        const recipe = Recipes.findOne(recipeId);
        if (recipe.private && recipe.owner !== this.userId) {
            // If the recipe is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }

        Recipes.update(recipeId, { $set: { checked: setChecked } });
    },
    'recipes.setPrivate'(recipeId, setToPrivate) {
        check(recipeId, String);
        check(setToPrivate, Boolean);

        const recipe = Recipes.findOne(recipeId);

        // Make sure only the recipe owner can make a recipe private
        if (recipe.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Recipes.update(recipeId, { $set: { private: setToPrivate } });
    },
});
