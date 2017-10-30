## GETTING STARTED FOR NOW
1. `cd ~/Development/SpruceLabs` or wherever you house all your projects
1. `git clone git@github.com:${username}/sprucebot-node.git` based on your fork
    * Make available as local module `cd sprucebot-node && yarn link`
1. `git clone git@github.com:${username}/react-sprucebot.git` again, fork it
    * Make available as local module `cd react-sprucebot && yarn link`
1. `git clone git@github.com:${username}/sprucebot-skills-kit.git` fork it real good
    * Use local linked modules if exists 
    * `cd sprucebot-skills-kit`
    * `yarn link sprucebot-node`
    * `yarn link react-sprucebot`
1. Open `sprucebot-skills-kit` inside of VSCode
1. Run the `Debug` configuration
1. Skills kit now uses the linked modules for easy development!

# Your Skill Title.

## Summary

## Links

## Credits

## How Now Brown Cow?
