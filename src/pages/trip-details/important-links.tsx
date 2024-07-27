import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useLinksContext } from "@/data/contexts/links";

export function ImportantLinks() {
  const { links, handleToggleCreateLinkModal } = useLinksContext();

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {links.map((link) => (
          <div
            key={`important-link-${link.id}`}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {/* Reserva do AirBnB */}
                {link.title}
              </span>
              <a
                href="#"
                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              >
                {/* https://www.airbnb.com.br/rooms/10470001139028321098312093821903812038910 */}
                {link.url}
              </a>
            </div>

            <Link2 className="text-zinc-400 size-5 shrink-0" />
          </div>
        ))}
      </div>

      <Button
        onClick={handleToggleCreateLinkModal}
        variant="secondary"
        size="full"
      >
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
