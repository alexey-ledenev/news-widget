# News-carousel Widget

## Src
```
https://cdn.jsdelivr.net/gh/alexey-ledenev/news-widget@latest/dist/js/app.js
```

### Add to site
```
<div
    data-url="http://source.com/rest-api"
    data-title="News"
    data-proxy-url="/proxy"
    data-source="Source name"
    data-request-limit="4"
    data-display-limit="2"
    data-b9c9-3eb89fea9247
></div>
<script src="https://cdn.jsdelivr.net/gh/rayzstar4eg/news-widget@latest/dist/js/app.js"></script>
```

### Alternative
```
<script
    data-url="http://source.com/rest-api"
    data-title="News"
    data-proxy-url="/proxy"
    data-source="Source name"
    data-request-limit="4"
    data-display-limit="2"
    src="https://cdn.jsdelivr.net/gh/rayzstar4eg/news-widget@latest/dist/js/app.js"
    data-b9c9-3eb89fea9247
></script>
```
## Attributes
+ data-url - API link
+ data-title - block title
+ data-proxy-url - proxy prefix (for CORS problems)
+ data-source - name of data source
+ data-request-limit - how many items will be loaded in one request
+ data-display-limit - how many items will be displayed
+ data-b9c9-3eb89fea9247 - required identifier
