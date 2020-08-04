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
{% for category_name in names %}
  <div class="archive-group">
    <h3  id="#{{ category_name | slugize }}" class="category-head">{{ category_name | capitalize}}</h3>
    <a name="{{ category_name | slugize }}"></a>
    {% for post in site.categories[category_name] %}
    <article class="archive-item">
      <p><a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a></p>
    </article>
    {% endfor %}
  </div>
{% endfor %}
</div>
