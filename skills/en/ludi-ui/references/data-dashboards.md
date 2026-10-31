# Data interfaces and dashboards

## DATA-01 · Filters and query intent

**Default.** Expose the most useful filters first, with an obvious “More filters” path, active count/summary, and clear/reset behavior. Three or four visible filters is a starting layout, not a limit. Do not hide critical or frequently combined conditions solely to simplify a screenshot.

Choose immediate vs explicit Apply from measured latency, query cost, and how users combine fields, not a universal row-count threshold. For Apply mode, separate **draft** and **applied** criteria; all results, counts, pagination, export, and URL state must correspond to the applied snapshot. For immediate mode, debounce text where useful and reject stale responses. Preserve usable results while refreshing when appropriate.

**Verify:** several draft changes trigger no premature query; Apply uses one consistent snapshot; reset, pagination, navigation/back, slow/out-of-order response, and failed request behave coherently.

## DATA-02 · Time is a data contract

**Contract.** Show the concrete interval and the reporting timezone. Define whether “last 7 days” includes today, represents complete calendar days, or is a rolling 168-hour interval. Preserve the service's inclusive/exclusive boundary contract; `[start, end)` often helps avoid duplicate boundaries but must not be imposed on a different API. Do not implement calendar days by subtracting fixed milliseconds across daylight-saving transitions.

Offer relevant presets and accessible custom entry/calendar; two months is useful only when space permits. Disable unsupported dates with an explanation rather than inventing a 90-day backend limit. Comparison requires supported, correctly aligned periods, meaningful labels, and accessible non-color distinction; it is not mandatory on every chart.

**Verify:** midnight, month/year boundaries, timezone and DST where relevant, end-date inclusion, invalid ranges, presets, and agreement between visible labels and request parameters.

## DATA-03 · Hierarchies and compressed selections

**Contract.** Keep the semantic selected set independent from its compact label display. Parent-all/partial labels such as “Engineering · all” or “19/20” may reduce clutter without changing submitted IDs. Define whether selecting a parent means current descendants or dynamically includes future descendants. Do not assume a server-paged or partially loaded tree has all children locally.

Specify all-on-page vs all-matching-results, disabled/inaccessible items, unknown totals, group clear, and cross-page selection. Preserve individual review/removal through focus/tap controls. One line plus `+N` is an optional density choice; maintain usability under zoom and translation.

**Verify:** deselect one child, incomplete tree loading, changed permissions/data, search, clear group, reopen, and exact payload equality before/after label aggregation.

## DATA-04 · A dashboard should answer a question

**Default.** Start from the user's decision, then choose indicators and charts. A small set of key metrics, trend/comparison context, freshness, and metric definitions often helps. Do not manufacture a KPI, trend, percentage, timestamp, or promised improvement because the layout has a slot for it. Source-note claims of 58%/40% gains are not evidence for this product.

Cross-filtering/drill-down is useful when the data contract supports it: show active context, breadcrumb/back, and reset; synchronize the relevant panels from one state source. Distinguish loading, genuine zero, empty, stale, partial, and error data. Provide textual/tabular alternatives to essential chart information.

**Verify:** the screen answers the target question, linked panels share the same criteria, drill-back restores context, and stale/partial results are labeled truthfully.

## DATA-05 · Export and action continuity

**Contract.** Add export only when requested or already supported. Keep authorization enforced by the service; hiding a button is not an access boundary. Export uses the applied filters, reporting timezone, sorting, and stated page/all-results scope. If exports are asynchronous, show pending/completion/failure and prevent accidental duplicates. Clarify stale-result behavior rather than exporting silently different criteria.

**Verify:** request parameters match visible applied state, rejected permission, empty export, failure/retry, and filename/content format. Follow the project's established spreadsheet/formula-injection handling rather than introducing an ad hoc transform.
