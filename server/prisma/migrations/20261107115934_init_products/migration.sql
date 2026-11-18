-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "image" TEXT NOT NULL,
    "images" TEXT[],
    "badge" TEXT,
    "Qty" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER,
    "reviews" INTEGER,
    "slug" TEXT NOT NULL,
    "desc" TEXT,
    "main1" TEXT,
    "main2" TEXT,
    "more1" TEXT,
    "more2" TEXT,
    "SKU" TEXT,
    "Brand" TEXT,
    "Availability" TEXT,
    "colors" JSONB,
    "shipping" DECIMAL(10,2),
    "discount" DECIMAL(10,2),
    "dimensions" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
