---
layout: default
---
{% assign all_categories = site.documents | map: "categories" | join: ", " | split : ", " | compact | uniq | sort  %}
{% assign all_page_tags = site.pages | map : "tags" | join: ", " | split : ", " | compact | uniq | sort %}
{% assign all_post_tags = site.posts | map : "tags" | join: ", " | split : ", " | compact | uniq | sort %}
{% assign all_tags = all_page_tags | concat: all_post_tags %}
{% assign all_tags = all_page_tags | compact %}

## "Stats"
There are {{all_categories | size}} categories and {{all_tags | size}} tags in use. Pages have {{ all_page_tags | size }} unique tags, posts have {{all_post_tags | size}}.

## Fixes
### Tags that should be categories
{% for tag in all_tags %}
{% if all_categories contains tag %}
Tag "{{tag}}" is also a category. Consider updating {{site.tags[tag] | map: "url" | join: ", " }}.
{% endif %}
{% endfor %}

### Posts with no category
{{ site.posts | where: "categories", "" | map: "url" | join: ", "}}

### Posts with no tags
{{ site.posts | where: "tags", "" | map: "url" | join: ", "}}

### Pages with no category
{{ site.pages | where: "categories", "" | map: "url" | join: ", "}}

### Pages with no tags
{{ site.pages | where: "tags", "" | map: "url" | join: ", "}}

## All categories
{{all_categories | join: "<br/>"}}

## All tags
{{all_tags | join: "<br/>"}}

## Posts with multiple categories
{% for page in site.posts %}
{% assign cat_size = page.categories | size %}
{% if cat_size > 1 %}
- {{page.url}} : {{ page.categories | join: ", "}}
{% endif %}
{% endfor %}
