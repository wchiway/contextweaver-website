# Hybrid Search

ContextWeaver uses hybrid search to balance semantic understanding with exact matching.

## Vector retrieval

Vector retrieval understands natural language intent, for example:

```text
How does this project handle cross-file dependencies?
```

It can find semantically related implementation snippets even when the query does not contain exact function names.

## Full-text retrieval

Full-text retrieval is useful for exact technical terms, for example:

```text
SearchService GraphExpander
```

It reliably matches function names, class names, file names, configuration keys, and other technical identifiers.

## RRF fusion

ContextWeaver uses Reciprocal Rank Fusion to combine recall results from multiple retrieval strategies. This reduces the bias of any single strategy and lets both semantic similarity and exact matching influence the final ranking.

## Rerank

After recall, candidates enter the rerank stage for finer-grained ordering before context expansion and packing.
