import Link from "next/link";

export default function NotFound() {
  return <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24 text-foreground"><h1 className="text-4xl font-bold">404 — Page not found</h1><p className="mt-4 text-base leading-8">This URL does not exist. For public DevTinder information, return to the homepage or use the links below.</p><pre className="mt-8 whitespace-pre-wrap rounded-lg border p-5 text-sm"># DevTinder recovery links\n- /\n- /about\n- /contact\n- /privacy\n- /llms.txt\n- /sitemap.xml</pre><nav className="mt-8 flex flex-wrap gap-4"><Link href="/">Home</Link><Link href="/sitemap.xml">Sitemap</Link><Link href="/llms.txt">Agent instructions</Link></nav></main>;
}
