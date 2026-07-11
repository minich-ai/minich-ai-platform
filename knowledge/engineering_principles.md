Minich AI Development OS
1. Human tokens are precious.

The scarce resource is not AI tokens.

The scarce resource is my own thinking, judgment, and domain expertise.

Therefore:

spend human effort making better product decisions
let agents perform repetitive implementation
preserve important human decisions permanently
2. Prototype before architecting

For new ideas:

Idea
    ↓
Minimal SPEC.md
    ↓
Agent builds prototype
    ↓
Human evaluates
    ↓
Improve SPEC
    ↓
Repeat

Avoid spending hours designing something that can be learned by examining a working prototype.

3. Specifications evolve

Treat SPEC.md as a living document.

Every important design decision eventually belongs in the spec.

Never rely on conversation history alone.

4. Every bug teaches the spec

When an issue is discovered:

Don't just fix code.

Update:

SPEC.md
TESTPLAN.md
acceptance criteria

so the same mistake cannot reappear later.

5. AI should forget discoveries, not human decisions

If an agent forgets something it discovered...

that's cheap.

If it forgets something I decided...

that's expensive.

Therefore:

Important human decisions always become documentation.

6. Documentation is memory

Markdown files are the long-term memory of the project.

Agents come and go.

Models improve.

Repositories remain.

7. Code is disposable

Especially during 0→1 exploration.

The valuable assets are:

requirements
architecture
prompts
evals
tests
documentation
design decisions

not necessarily the first implementation.

8. Build evals alongside features

Every important capability eventually gains:

acceptance criteria
regression tests
examples
edge cases

The coding loop stops when the evals pass.