# Context Weaving

A single matched code chunk is often not enough to answer a question. ContextWeaver expands around matched chunks and packs the result within a token budget.

## Three expansion stages

### E1 Neighbor expansion

Add adjacent chunks from the same file so functions, comments, and type definitions are not cut off.

### E2 Breadcrumb completion

Add related chunks from the same class, function, or module hierarchy so the model can understand local structure.

### E3 Import resolution

Follow import relationships across files to include referenced types, helper functions, and module boundaries.

## Token-aware packing

Expanded snippets are passed to ContextPacker. It merges adjacent snippets, removes duplicates, sorts results, and trims output to fit the token budget before producing the final context package for the LLM.
