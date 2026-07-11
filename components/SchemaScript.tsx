// Server Component — safe to use in any RSC or layout.
// Renders one or more JSON-LD objects as <script> tags in the document <head>.

interface SchemaScriptProps {
  // Pass one or more schema objects produced by lib/schema.ts
  schemas: object | object[];
}

export default function SchemaScript({ schemas }: SchemaScriptProps) {
  const list = Array.isArray(schemas) ? schemas : [schemas];

  return (
    <>
      {list.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // dangerouslySetInnerHTML is safe here: JSON.stringify produces
          // valid JSON with no user-controlled input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
