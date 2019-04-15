---
title: Overview
page_title: Menu | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Menu tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_menu_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/menu
position: 1
---

# Menu Tag Helper Overview

The Menu tag helper helps you configure the Kendo UI Menu widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Menu by using the Menu tag helper.

###### Example

		<kendo-menu name="menu">
		</kendo-menu>

## Configuration

### Menu

To pass the Menu items collection, either:

* Use the nested `<items>` tag, or
* Add `<li>` tags. This approach will not include the `menu-item` tag helper attributes.

```tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Home"></menu-item>
        <menu-item text="Second Page"></menu-item>
    </items>
</kendo-menu>
```
```tagHelper-li
<kendo-menu name="menu">
    <li>Home</li>
    <li>Second Page</li>
</kendo-menu>
```
```cshtml
@(Html.Kendo().Menu()
		.Name("menu")
		.Items(items => {
				items.Add().Text("Home");
				items.Add().Text("Second Page");
		})
)
```

To further configure the Menu tag helper, use its other options&mdash;`<open-on-click>`, `<popup-animation>`, and `<scrollable>`.

```tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Home"></menu-item>
        <menu-item text="Second Page"></menu-item>
    </items>
    <open-on-click enabled="true" root-menu-items="true" sub-menu-items="false" />
    <popup-animation>
        <open duration="500" />
        <close duration="300" />
    </popup-animation>
    <scrollable enabled="false" />
</kendo-menu>
```
```cshtml
@(Html.Kendo().Menu()
    .Name("menu")
    .Items(items => {
        items.Add().Text("Home");
        items.Add().Text("Second Page");
    })
    .OpenOnClick(open => open.RootMenuItems(true).SubMenuItems(false))
    .Animation(animation =>
        animation.Open(open => open.Duration(500))
                 .Close(close => close.Duration(300))
    )
    .Scrollable(true)
)
```

### Menu Items

The Menu items are represented by the `menu-item` tag helper and render `<li>` tags inside the Menu root element. The `<menu-item>` utilizes different inner tags and attributes to let you configure the Menu items.

The `menu-item` tag helper inherits the [`AnchorTagHelper`](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/tag-helpers/built-in/anchor-tag-helper) class which enables you to utilize the native navigation attributes that come with it.

```tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Home" asp-action="Index" asp-controller="Home"></menu-item>
        <menu-item text="Second Page" asp-action="SecondIndex" asp-controller="Home"></menu-item>
    </items>
</kendo-menu>
```
```cshtml
@(Html.Kendo().Menu()
    .Name("menu")
    .Items(items => {
        items.Add().Text("Home").Action("Index", "Home");
        items.Add().Text("Second Page").Action("SecondIndex", "Home");
    })
)
```

You can also directly set up a URL that navigates to the desired location.

###### Example

```
<kendo-menu name="menu">
    <items>
        <menu-item text="Home" url="/home/index"></menu-item>
    </items>
</kendo-menu>
```

To create popup menus, configure the items by using the `<sub-items>` tag of the `menu-item`.

```tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Navigate">
            <sub-items>
                <menu-item text="Home"></menu-item>
                <menu-item text="About"></menu-item>
                <menu-item text="Contact"></menu-item>
            </sub-items>
        </menu-item>
    </items>
</kendo-menu>
```
```cshtml
@(Html.Kendo().Menu()
        .Name("menu")
        .Items(items =>
        {
            items.Add().Text("Navigate").Items(subitems => {
                subitems.Add().Text("Home");
                subitems.Add().Text("About");
                subitems.Add().Text("Contact");
            });
        })
)
```

Identical to the Kendo UI Menu helper method, you can customize the Menu items by adding images, [icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web), custom CSS classes, and DOM attributes.

```tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Home" my-attr="value" link-html-attributes='new { link_attr="value" }'></menu-item>
        <menu-item text="About" image-url="path/to/image.png" image-html-attributes='new { img_attr="value" }'></menu-item>
        <menu-item text="Contact" icon-class="k-sprite my-sprite-class"></menu-item>
        <menu-item text="Login" icon="login" ></menu-item>
    </items>
</kendo-menu>
```
```cshtml
@(Html.Kendo().Menu()
		.Name("menu")
		.Items(items =>
		{
				items.Add().Text("Home")
						.LinkHtmlAttributes(new { link_attr = "value" })
						.HtmlAttributes(new { my_attr="value" });

				items.Add().Text("About")
						.ImageUrl("path/to/image.png")
						.ImageHtmlAttributes(new { img_attr = "value" });

				items.Add().Text("Contact")
						.SpriteCssClasses("my-sprite-class");

				// The Kendo Menu helper method does not support icons yet.
		})
)
```

You can also define the popup of each Menu item with HTML syntax by using the `<content>` tag helper.

```tagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Locations">
            <content class="locations-menu-content" content-attr="value">
                <div id="template" style="padding: 10px;">
                    <h2>Around the Globe</h2>
                    <ol>
                        <li>United States</li>
                        <li>Europe</li>
                        <li>Canada</li>
                        <li>Australia</li>
                    </ol>
                    <img src='@Url.Content("~/shared/web/menu/map.png")' alt="Stores Around the Globe" />
                    <button class="k-button">See full list</button>
                </div>
            </content>
        </menu-item>
    </items>
</kendo-menu>
```
```cshtml
@(Html.Kendo().Menu()
    .Name("menu")
    .Items(items =>
    {
			items.Add().Text("Locations")
					.ContentHtmlAttributes(new { @class= "locations-menu-content", content_attr = "value" })
					.Content(@<text>
								<div id="template" style="padding: 10px;">
										<h2>Around the Globe</h2>
										<ol>
												<li>United States</li>
												<li>Europe</li>
												<li>Canada</li>
												<li>Australia</li>
										</ol>
										<img src='@Url.Content("~/shared/web/menu/map.png")' alt="Stores Around the Globe" />
										<button class="k-button">See full list</button>
								</div>
						</text>);
			})
)
```


## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
