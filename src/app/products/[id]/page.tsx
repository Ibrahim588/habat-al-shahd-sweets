import { Suspense } from "react";
import { initialProducts } from "@/data/initialData";
import ProductDetailView from "@/components/products/ProductDetailView";
import type { Metadata } from "next";

export function generateStaticParams() {
  return initialProducts.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = initialProducts.find((p) => p.id === resolvedParams.id);
  if (!product) {
    return {
      title: "صنف غير موجود | حلويات حبات الشهد",
    };
  }

  return {
    title: `${product.name} | حلويات حبات الشهد`,
    description: product.description,
    openGraph: {
      title: `${product.name} | حلويات حبات الشهد`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-brown bg-cream min-h-screen">
          جاري تحميل تفاصيل الصنف...
        </div>
      }
    >
      <ProductDetailView productId={resolvedParams.id} />
    </Suspense>
  );
}
