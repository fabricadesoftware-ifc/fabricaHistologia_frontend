import { useSpecieStore } from "./blog/specie.js";
import { useOrganStore } from "./blog/organ.js";
import { useSlideStore } from "./blog/slide.js";
import { useSystemStore } from "./blog/system.js";
import { usePostStore } from "./blog/post.js";
import { useSupportingStore } from "./supporting_material/supporting.js";
import { useCollaboratorsStore } from "./auth/collaborators.js";

export {
    useSpecieStore,
    useSlideStore,
    useSupportingStore,
    useSystemStore,
    useOrganStore,
    usePostStore,
    useCollaboratorsStore,
}