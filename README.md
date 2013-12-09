# knockout-kendo

**knockout-kendo** is a project to create a robust set of [Knockout.js](http://knockoutjs.com/) bindings for the [Kendo UI](http://kendoui.com/) widgets.

## Compatibility and Requirements

knockout-kendo was designed to work with Kendo UI and Knockout.js. The project depends on the following libraries:

- [jQuery](http://www.jquery.com) v1.8.2
- [Kendo UI](http://www.kendoui.com)  v2012.3.1114
- [Knockout](http://www.knockoutjs.com) v2.3

knockout-kendo has not been tested against any other versions of these libraries. You may find that versions other than these are compatible with [Project Name], but we make no claims to support those version, nor can we troubleshoot issues that arise when using those versions.

### Build Note
This project uses [grunt](http://gruntjs.com/) for building/minifying.

If you don't have [grunt](http://gruntjs.com/) installed yet, install it as follows:

    npm install -g grunt-cli

Then, in the project root directory, install the dependencies using:

    npm install

Now you are ready to build knockout-kendo, by calling `grunt`.

## Source Code and Downloads

Download the plugin from here or grab the latest build from the source. Reference knockout-kendo.min.js after the scripts for Knockout and Kendo UI (requires jQuery).
	
	<script src="js/jquery.min.js"></script>
	<script src="js/kendo.web.min.js"></script>
	<script src="js/knockout-2.3.0.js"></script>
	<script src="js/knockout-kendo.min.js"></script>

Note: It is fine to reference Kendo UI scripts for individual widgets rather than all widgets (kendo.web.min.js), as this plugin will only create bindings for available widgets.

## Documentation

See http://rniemeyer.github.com/knockout-kendo/ for documentation and details.

## How to Contribute

If you would like to contribute to [Project Name]'s' source code, please read the [guidelines for pull requests and contributions](CONTRIBUTING.md). Following these guidelines will help make your contributions easier to bring in to the next release.

## Getting Help

Use this section to list ways that a developer can obtain help or support for this project, for instance, Stack Overflow. Make sure to also leave the following section:

As a part of Kendo UI Labs, [Project Name] is intended to be a community-run project, and not an official part of any Kendo UI SKU (Web, DataViz, Mobile or Complete). As such, this project is not a supported part of Kendo UI, and is not covered under the support agreements for Kendo UI license holders. Please do not create support requests for this project, as these will be immediately closed and you'll be directed to post your question on a community forum.

## Release Notes

For change logs and release notes, see the [releases section](https://github.com/kendo-labs/knockout-kendo/releases).

## License Information

This project has been released under the [Apache License, version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html), the text of which is included below. This license applies ONLY to the project-specific source of each repository and does not extend to Kendo UI itself, or any other 3rd party libraries used in a repository. For licensing information about Kendo UI, see the [License Agreements page](https://www.kendoui.com/purchase/license-agreement.aspx) at [KendoUI.com](http://www.kendoui.com).

> Copyright © 2013 Telerik

> Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

> [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

>  Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
