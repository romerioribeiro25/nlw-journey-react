import { Link2, Tag, X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLinksContext } from "@/data/contexts/links";
import { Button } from "@/components/button";

// Definindo o esquema de validação com Zod
const createLinkSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  url: z.string().url("Insira um URL válido."),
});

type CreateLinkFromData = z.infer<typeof createLinkSchema>;

export function CreateImportantLinkModal() {
  const { createLinks, handleToggleCreateLinkModal } = useLinksContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLinkFromData>({
    resolver: zodResolver(createLinkSchema),
  });

  async function handleCreateLink({ title, url }: CreateLinkFromData) {
    try {
      // Criando o link após a validação
      await createLinks({ title, url });
      handleToggleCreateLinkModal();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Cadastrar Link</h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={handleToggleCreateLinkModal}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleCreateLink)} className="space-y-3">
          <>
            <div
              className={`h-14 flex-1 px-4 bg-zinc-950 border rounded-lg flex items-center gap-2 ${
                errors.title ? "border-red-500" : " border-zinc-800"
              }`}
            >
              <Tag className="text-zinc-400 size-5" />
              <input
                {...register("title")}
                placeholder="Descreva o link (Ex.: Hotel hospedagem)"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>

            {errors.title && (
              <div className="flex-1 px-4">
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              </div>
            )}
          </>

          <>
            <div
              className={`h-14 flex-1 px-4 bg-zinc-950 border rounded-lg flex items-center gap-2 ${
                errors.url ? "border-red-500" : " border-zinc-800"
              }`}
            >
              <Link2 className="text-zinc-400 size-5" />
              <input
                {...register("url")}
                placeholder="Qual o link? (Ex.: https://www.exemplo.com)"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
            {errors.url && (
              <div className="flex-1 px-4">
                <span className="text-red-500 text-sm">
                  {errors.url.message}
                </span>
              </div>
            )}
          </>

          <Button size="full">Salvar Link</Button>
        </form>
      </div>
    </div>
  );
}
