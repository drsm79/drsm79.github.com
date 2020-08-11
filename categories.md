---
layout: page
permalink: /categories/
title: Categories
---

<div id="archives">
{% assign names = "" %}
{% for category in site.categories %}
{% assign names = names |append: category.first | append: ", " %}
{% endfor %}
{% assign names = names | split: ", " | sort %}
{% assign misc_posts = " " | split: " "%}
{% for category_name in names %}
  {% if site.categories[category_name].size > 3 %}
  <a class="anchor" name="{{ category_name | slugize }}"></a>
  <div class="archive-group">
    <h3  id="#{{ category_name | slugize }}" class="category-head">{{ category_name | capitalize}}</h3>
    {% for post in site.categories[category_name] %}
    <article class="archive-item">
      <p><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></p>
    </article>
    {% endfor %}
  </div>
  {% else %}
  {% assign misc_posts = misc_posts | concat: site.categories[category_name] %}
  {% endif %}
{% endfor %}
  {% assign category_name = "misc." %}

  {% assign misc_posts = misc_posts | sort: "date" | reverse %}
  <a class="anchor" name="{{ category_name | slugize }}"></a>
  <div class="archive-group">
    <h3  id="#{{ category_name | slugize }}" class="category-head">{{ category_name | capitalize}}</h3>
    <p class="small">That which doesn't fit elsewhere</p>
    {% for post in misc_posts %}
    <article class="archive-item">
      <p><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></p>
    </article>
    {% endfor %}
  </div>
</div>
