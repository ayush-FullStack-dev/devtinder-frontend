import { AppName } from "@/constants/constants";
import JsonLd from "@/constants/JsonLd";


export async function PageLayout() {
  return (
    <div>
      <h1>Hii from {AppName}</h1>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JsonLd),
        }}
      />

      <PageLayout />
    </>
  );
}
