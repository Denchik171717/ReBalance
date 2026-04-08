import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "~/components/header";
import { AuthGuard } from "~/components/auth-guard";
import { getUser } from "~/utils/auth.server";
import { resources, getCategoryLabel } from "~/data/resources";
import { isFavorite, addFavorite, removeFavorite } from "~/utils/favorites";
import type { Route } from "./+types/resource.$id";
import styles from "./resource.module.css";

export async function loader({ request, params }: Route.LoaderArgs) {
  const user = await getUser(request);
  const resource = resources.find(r => r.id === params.id);
  if (!resource) {
    throw new Response("Resource not found", { status: 404 });
  }
  return { user, resource };
}

export default function ResourcePage({ loaderData }: Route.ComponentProps) {
  const { user, resource } = loaderData;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(resource.id));
  }, [resource.id]);

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(resource.id);
    } else {
      addFavorite(resource.id);
    }
    setIsFav(!isFav);
  };

  return (
    <AuthGuard user={user}>
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.category}>{getCategoryLabel(resource.category)}</span>
            <h1 className={styles.title}>{resource.title}</h1>
            {resource.duration && (
              <div className={styles.duration}>⏱ {resource.duration}</div>
            )}
            <button onClick={toggleFavorite} className={styles.favoriteButton}>
              {isFav ? '★ В избранном' : '☆ В избранное'}
            </button>
          </div>
          <div className={styles.imageContainer}>
            <img src={resource.imageUrl} alt={resource.title} className={styles.image} />
          </div>
          <div className={styles.content}>
            <p className={styles.description}>{resource.description}</p>
            <div className={styles.fullContent}>
              {resource.content.map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}