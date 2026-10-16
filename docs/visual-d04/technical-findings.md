# D04 technical findings and review limits

Date: 2026-10-15. Baseline: `ad31526dbd9675d3f2b0dd0f2337ad77e7b7625e`.

No substantive error requiring a correction to approved D04 prose was identified in this visual review. The original prose, code, exercises, rubrics, reference lists and approval metadata are preserved exactly. This is a scoped review, not a claim that every protocol variant is exhaustively audited.

The retained C14 fixture sends the continuation before it awaits the observed pong. D04-V14 shows a permitted pong-before-continuation ordering to teach interleaved control; its caption explicitly disclaims a measured packet/event ordering. The accept value confirms the WebSocket opening and is not identity or user authorization proof. Both distinctions were checked during source/caption review; the approved lab was not changed.

C18’s historical missing-evidence bugs are already corrected in the baseline. Missing or non-Boolean completion evidence remains unknown, even with status 200 or an observed action. The new reasoning-loop figure does not replace that classifier with a root-cause detector. Historical pre-approval evidence retains its dated status wording and is interpreted through the existing editorial-approval record.

Draft asset defects, resolved within this pass: V03/V04/V19 initially fell below the 12 px mobile text floor; shorter labels and narrower layouts corrected them. Manual rendered inspection caught note text extending beyond note boxes in V06/V14/V15/V16/V18. Shorter notes and an additional box-containment assertion address that renderer behavior. No shared renderer or dependency was changed. These were new-asset review findings, not approved-text corrections.

Unexecuted integrations remain unexecuted: browser EventSource/WebSocket/CORS, real proxy buffering/trust chains, impaired network/MTU/loss experiments, full TLS variants, real QUIC/h3, generated protobuf/gRPC and final trailers. See the original [D04 execution scope](../../domains/04-network-protocol-engineering/evidence/educational-execution.md#explicit-practical-limitations) and new [lab replay](lab-replay.json). Local SVG/Markdown previews do not establish GitHub publication layout, PDF behavior, all assistive-technology behavior, provider qualification, production root cause or learner competency.

Product Owner visual acceptance and every human evaluation result remain **not_run**. D05 remains not_started. No later phase is authorized by this review.
