# BuildWise AI — Construction & Civil Works Assistant
Prototype v0.1

## Purpose
Client-showcase prototype for an AI-assisted construction planning and estimation application.

## Client requirements represented in this prototype
- Project creation with location/soil/plot/building/floor/room inputs
- Floor and room planning
- Structural materials
- Wall and masonry
- Flooring and tiles
- Painting
- Doors and windows
- Electrical
- Plumbing
- Sanitary fittings
- Kitchen
- Furniture
- External works
- Labour cost
- Transport and other expenses
- Contingency
- Final cost dashboard
- Product/material catalogue with indicative prices
- Chat support for construction and cost questions
- General documentation/registration guidance with a legal guardrail

## Important prototype boundary
The cost catalogue uses demo values to validate UX and calculation flow. It is NOT a live market-price engine.
The legal assistant intentionally provides general workflow guidance rather than jurisdiction-specific legal advice.
Before production, connect approved local/vendor rate data and authoritative government/legal sources.

## Run
Open `index.html` in a browser.

## Proposed production architecture
User UI -> API -> Intent/Query Router -> Retrieval Layer -> Vector DB -> RAG/LLM -> Safety/Legal Guardrail -> Structured Response
                               |-> Estimation Engine -> Rate Database
                               |-> Product Catalogue -> Vendor/Inventory APIs
                               |-> Project Database -> Project/Chat history

## AI/RAG implementation plan after client approval
1. Replace demo chat rules with retrieval-augmented generation.
2. Ingest approved construction manuals, standards, project documents and official legal/registration sources.
3. Add PyMuPDF/document loaders, cleaning, chunking, metadata and embeddings.
4. Store chunks in Pinecone (or approved vector database).
5. Add citations: document, section and page/URL.
6. Add intent classification: construction, product, estimate, documentation, registration, safety.
7. Add structured output schemas for estimates.
8. Add a deterministic calculation engine; do not let the LLM perform final arithmetic.
9. Add state/city-aware legal retrieval.
10. Add evaluation datasets for retrieval accuracy, answer faithfulness, calculation accuracy and citation accuracy.
11. Add authentication, project persistence and audit logs.
12. Deploy after security, legal and domain review.

## Senior AI engineering principle
The LLM should explain and orchestrate; deterministic services should calculate; retrieval should ground; authoritative sources should support legal guidance; and professional review should remain the final gate for structural/site-specific decisions.
