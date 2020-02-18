import { AssetsImporter, AssetsPack } from "../assets-importer/assets-importer";
import { Texture2D, FilterMode } from "../../core/core";
import { TextureFormat } from "../../core/texture-format";
import { GlobalContext } from "../../core/global";

export const TextureImporter: AssetsImporter = {
    import(buffer, ctx = GlobalContext())
    {
        return new Promise<AssetsPack>((resolve, reject) =>
        {
            const blob = new Blob([buffer]);
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            const complete = () =>
            {
                
                const tex = new Texture2D(img.width, img.height, TextureFormat.RGBA, FilterMode.Linear, ctx);
                tex.setData(img);
                const pack = new AssetsPack();
                pack.add(tex);
                pack.setMain(tex);
                resolve(pack);
            };
            if (img.complete)
                complete();
            else
                img.onload = complete;
        });
    }
}