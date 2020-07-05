---
layout: default
---
{% assign post_tags = site.posts | map: "tags" %}
{% assign post_categories = site.posts | map: "categories" %}
{% assign page_tags = site.pages | map: "tags" %}
{% assign page_categories = site.pages | map: "categories" %}
{% assign all_categories = post_categories | concat: page_categories | join: ", " | split : ", " | compact | uniq | sort  %}
{% assign all_tags = post_tags | concat: page_tags | join: ", " | split : ", " | compact | uniq | sort %}

## "Stats"
There are {{all_categories | size}} categories and {{all_tags | size}} tags in use.

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