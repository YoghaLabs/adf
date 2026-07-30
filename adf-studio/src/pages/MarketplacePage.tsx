import { useEffect } from "react";
import { Badge, Button, Card, Input } from "@/components/ui";
import { useMarketplaceStore } from "@/stores/marketplaceStore";
import { useSettingsStore } from "@/stores/settingsStore";

export function MarketplacePage() {
  const browse = useMarketplaceStore((s) => s.browse);
  const search = useMarketplaceStore((s) => s.search);
  const items = useMarketplaceStore((s) => s.items);
  const featured = useMarketplaceStore((s) => s.featured);
  const query = useMarketplaceStore((s) => s.query);
  const setQuery = useMarketplaceStore((s) => s.setQuery);
  const loading = useMarketplaceStore((s) => s.loading);
  const notify = useSettingsStore((s) => s.pushNotification);

  useEffect(() => {
    void browse();
  }, [browse]);

  return (
    <div data-testid="page-marketplace" className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Marketplace</h1>
        <p className="studio-muted mt-1">Browse / search / featured — MarketplaceClient only.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Input
          className="max-w-sm"
          placeholder="Search packages"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="accent" onClick={() => void search()}>
          Search
        </Button>
        <Button variant="outline" onClick={() => void browse()}>
          Browse
        </Button>
      </div>
      <section>
        <h2 className="mb-3 text-sm font-semibold">Featured</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {featured.map((item) => (
            <Card key={item.id}>
              <div className="flex items-center justify-between">
                <div className="font-medium">{item.name}</div>
                <Badge>{item.category}</Badge>
              </div>
              <p className="studio-muted mt-1">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold">Catalog {loading ? "…" : `(${items.length})`}</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-ink-muted">{item.version}</div>
                </div>
                {item.verified && <Badge className="border-success/40 text-success">Verified</Badge>}
              </div>
              <p className="studio-muted mt-2">{item.description}</p>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="accent"
                  onClick={() =>
                    notify({
                      title: "Install requested",
                      body: `${item.id} queued via SDK (no local install logic)`,
                      tone: "info",
                    })
                  }
                >
                  Install
                </Button>
                <Button variant="outline">Update</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
