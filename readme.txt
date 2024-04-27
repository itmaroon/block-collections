=== Block Collections ===
Contributors: itmaroon
Tags: block, Gutenberg, design, custom, heading, input, select, highlight, prosess,table,button,group,checkbox
Requires at least: 6.5
Tested up to:      6.5.2
Stable tag:        1.3.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
Requires PHP: 8.2.10

It is a plug-in that collects small scale blocks.

== Related Links ==

* [block-collections:Github](https://github.com/itmaroon/block-collections)
* [block-class-package:GitHub](https://github.com/itmaroon/block-class-package)  
* [block-class-package:Packagist](https://packagist.org/packages/itmar/block-class-package) 
* [itmar-block-packages:npm](https://www.npmjs.com/package/itmar-block-packages)  
* [itmar-block-packages:GitHub](https://github.com/itmaroon/itmar-block-packages)


== Description ==

When this plugin is installed, the following 9 blocks are registered and can be used not only in the block editor but also in the site editor (tested on WordPress 6.4.2). In principle, each block can be configured with basic styles such as text color, background color, border, and white space, and in some cases it is also possible to set shadows and icons. There are also some that have simple animations set.
Below is a brief explanation of each block.
1 Design Title
A block that allows you to style HTML heading tags. In addition to the normal style, we have prepared a type that allows you to insert a circular marker, and a type that allows you to add sub copies and icons.
2 Design Text Control
This is a block that allows you to style text controls and text area controls for HTML input elements. This time, we have prepared a normal box type and a line type. It is now possible to display required inputs, and it is a block that can be used for validation checks as an inner block of the Guest Contact Block, which will be released soon.
3 Design CheckBox
This is a block that allows you to style checkboxes in HTML input elements. Check animation. At the moment, we only have one type available, but we plan to gradually offer other variations in the future.
4 Design Select
A block that allows you to style HTML SELECT elements. It boasts that the selection element moves with a slightly fancy animation. Supports single selection and multiple selection.
5 Design Process
A block for displaying the input process of form input. It is assumed that it will be used as an inner block for the Guest Contact Block, which will be released soon, and this block will not work on its own.
6 Code HighLight
This block allows you to enter code in the text area in edit mode and highlight it on the front end. This block uses the Google Code Prettify library for highlighting.
7. Design Table
Displays the contents of a form object placed on a web page as a data source.
It is intended to be installed in the input confirmation form as an inner block of Form Send Blocks, which will be released soon.
8. Design Button
You can choose between regular buttons and submit buttons inside form elements. When you select the regular button, you can select a link to a fixed page and transition to that page.
9. Design Group
- Its main function is to store blocks and set their arrangement.
The placement can be selected according to the CSS display property block, flex(row), flex(column), or grid. If you select grid, you can set various grid styles.
- Compatible with block themes, you can select contentSize and wideSize in the layout clause of theme.json, and you can also set the width to match the content width or freely set the width.
- By setting it to "Make it a menu", it will become a hamburger button in mobile mode (displayed on devices with a width of 767px or less), and when you click it, it will stick out from the left.
- These settings can be set separately for desktop mode (displayed on devices with a width of 768px or more) and mobile mode (displayed on devices with a width of 767px or less).
- By setting it to be movable, you can adjust the placement by dragging. With this feature installed, the old version of Draggble Box has been discontinued.

== Installation ==

1. From the WP admin panel, click “Plugins” -> “Add new”.
2. In the browser input box, type “Block Collections”.
3. Select the “Block Collections” plugin and click “Install”.
4. Activate the plugin.

OR…

1. Download the plugin from this page.
2. Save the .zip file to a location on your computer.
3. Open the WP admin panel, and click “Plugins” -> “Add new”.
4. Click “upload”.. then browse to the .zip file downloaded from this page.
5. Click “Install”.. and then “Activate plugin”.

== Frequently Asked Questions ==


== Screenshots ==
1. 3 types of design title blocks
2. Two types of design text control blocks
3. design checkbox block
4. Two types of design selection blocks
5. code highlighting block
6. Two types of design process blocks
7. Edit Design Group Grid Style
8. Design Table and Design Button
9. A block icon registered by the plugin. Divided into design group and widget group
10. Blocks that slide in with animation

== Changelog ==
= 1.3.0 =
- Modified to be compatible with WordPress 6.5.
- PHP class management is now done using Composer.  
[GitHub](https://github.com/itmaroon/block-class-package)  
[Packagist](https://packagist.org/packages/itmar/block-class-package) 
- I decided to make functions and components common to other plugins into npm packages, and install and use them from npm.  
[npm](https://www.npmjs.com/package/itmar-block-packages)  
[GitHub](https://github.com/itmaroon/itmar-block-packages)

= 1.2.1 =
Function addition
- The following block now supports font size responsiveness.
1. Subcopy of Design Title
2. Lable of Design CheckBox
3. Design Table headings and data
4. Design Process progress number and progress information
5. Text inside the button of Design Button
6. Design Select labels and options
7. Design Text Control labels and input text
- Added the following functions to core/image functions:
1. You can now choose to fit the image to the block size.
2. The size of the block can now be specified using the ratio to the parent element, etc.
- Added the following features to Design Group
1. Added functionality to become swiper-slide for Slide MainView of Slide Blocks (coming soon)
2. Added the ability to retain attributes to create a parallax effect within the Slide MainView slide of Slide Blocks (coming soon)

Bug fixes
- Fixed a bug where higher-order component functions were not enabled when adding core/image.

= 1.2.0 =
Function addition
- Added the ability to generate DOM elements as swiper slides in Design group
- New option to set block width to full width of viewport in Design group
- The position property (static, fixed, absolute, sticky) can now be set for Design group.
- Added the ability to set animation to Design Group
- Added a module that allows you to add functionality using core blocks as higher-order components.
- Added the ability to display images and pseudo-elements on Design Buttons
- Added the ability to specify archive pages and free URLs for Design Button links.
- Vertical writing can now be set for Design Title.
Bug fixes
- Fixed an issue where the archive page of the root domain WordPress site would be displayed when a fixed page was selected as the link destination type of Design Button.
- Fixed a bug where the font color of Design Title was rewritten to the theme color.
- Fixed text domain from 'itmar_block_collections' to 'block-collections' to match plugin slug.
- Fixed an issue where the 'Block validation failed' error occurred in the Design Title sub-copy style.

= 1.1.3 =
Bug fixes
- Fixed an issue where the sidebar wording for setting the submenu position was not internationalized.
- Corrected the issue where range control could only be set in 100px increments when selecting Free in the block width settings, so it can now be changed in 10px increments.
= 1.1.2 =
Bug fixes
- Fixed a bug where the archive page of the root domain WordPress site was displayed when archive page was selected in the link type of Design Title.
- Fixed an issue where the block placement icon was showing vertical placement when it should have shown horizontal placement.
- When viewing on mobile, the submenu display was displayed small in the main menu, but now it is displayed larger.
- When changing the display of the built-in post type from "Post" to other wording, the display of archive links will be adjusted accordingly.

= 1.1.1 =
Bug fixes
- Fixed an issue where the site title and tagline of the root domain site were displayed in Design Title for WordPress sites installed on subdomains.
- Fixed an issue where blocks from the previous version remained in the cache when upgrading.

= 1.1.0 =
Version up public release
1. Design Title
- You can now select the type of text to display, not only the characters input by the user, but also the site title and catchphrase set in the general settings.
- This block can now be made into a link. The following types of link types are available.
  - Link to fixed page
  - Link to archive page
  - Link to any URL
  - Link to display submenu
  With these features, you can now utilize this block as a menu item.
- In the subcopy style, subcopies can now be placed vertically and horizontally.
With this, you can now easily create menu items with icons and subtitles.
- Added the ability to set underline animation.
2. Design Text Control
- In mobile mode (displayed on devices with a width of 767px or less), the label is now placed at the top right of the input box when using the default style.
3. Design CheckBox
- Equipped with a function to set whether to continue processing as an inner block of Form Send Blocks that will be released soon.
4. Design Select
- Now displayed with a label.
- When placed as an inner block of Form Send Blocks, which will be released soon, the label name of the selected option is now retained as an input value.
5. Design Process
There are no changes
6. Code HighLight
Fixed a bug in the block editor where the code was not displayed in editor mode when mounting a block.
7. Design Table
This is a new block added in this version.
8. Design Button
This is a new block added in this version.
9. Design Group
This is a new block added in this version.

= 1.0.0 =
First public release


== Arbitrary section ==
1. In this version, style settings that may require responsiveness can be set separately in desktop mode (displayed on devices with a width of 768px or more) and mobile mode (displayed on devices with a width of 767px or less). It becomes. To tell which setting is set, when you switch the display mode in the block editor or site editor, "(Desktop)" and "(Mobile)" will be displayed in the side menu display.
Please note that responsiveness for tablet display is not supported.
2. This plugin has a dependency on the upcoming Form Send Blocks. This plugin requires installation and activation in order to use it.
3. Regarding the display of text, etc., settings are made using WordPress's internationalization function, so it is possible to display text in multiple national languages. Currently, English and Japanese notation is possible.
4. PHP class management is now done using Composer.  
[GitHub](https://github.com/itmaroon/block-class-package)  
[Packagist](https://packagist.org/packages/itmar/block-class-package) 
5. I decided to make functions and components common to other plugins into npm packages, and install and use them from npm.  
[npm](https://www.npmjs.com/package/itmar-block-packages)  
[GitHub](https://github.com/itmaroon/itmar-block-packages)
