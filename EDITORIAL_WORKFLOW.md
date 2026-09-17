# CenTex Press Editorial Workflow

CenTex Press should remain simple to operate. Publishing one item should update the public site automatically wherever possible.

## Story workflow

1. Draft
2. Review
3. Fact check and source check
4. Edit
5. Approved
6. Published
7. Correction or update, when needed

A public story is a Markdown or MDX file in `src/content/stories/`. Set `draft: true` while it is not ready. Set `draft: false` to publish. Set `featured: true` for a homepage lead. The homepage, Latest page, section page, article URL, search and sitemap are generated from the same story record.

## The Receipts

Public source documents are records in `src/content/receipts/`. Each record stores the agency, document type, document date, public file URL and optional related story. The Receipts page is generated automatically from these records.

Documents should be published only when CenTex Press has the right to make them public and has reviewed them for sensitive personal information.

## Events

Events are records in `src/content/events/`. The public Events page shows upcoming events and automatically stops listing expired events.

## Community submissions

Community submissions must never publish automatically. Future submission forms should write to a private review queue, not directly to the public story collection.

Recommended statuses: Submitted, Review, Fact Check, Edit, Approved, Published, Declined.

## Forms and privacy

Do not connect a public form until there is a defined secure destination, retention policy and spam protection. Tip submissions may contain sensitive information. The public site should never imply that a form was submitted when no backend received it.

## Editorial labels

Keep Staff Reporting, Community Contributor, Opinion and third-party feed material clearly distinguishable. Advertising must remain clearly labeled and separate from editorial content.
