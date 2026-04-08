import { useState } from "react";
import { Link } from "react-router";
import { Clock } from "lucide-react";
import { Header } from "~/components/header";
import { AuthGuard } from "~/components/auth-guard";
import { getUser } from "~/utils/auth.server";
import { getUserProgress } from "~/services/user.server";
import { resources, getCategoryLabel, type Resource } from "~/data/resources";
import { getFavorites } from "~/utils/favorites";
import type { Route } from "./+types/resources";
import styles from "./resources.module.css";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getUser(request);
  let userProgress = null;
  
  if (user) {
    userProgress = getUserProgress(user.id);
  }
  
  return { user, userProgress };
}

export default function Resources({ loaderData }: Route.ComponentProps) {
  const { user, userProgress } = loaderData;
  const [activeFilter, setActiveFilter] = useState<Resource["category"] | "all" | "favorites">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = (() => {
    // Сначала фильтруем по категории/избранному
    let filtered = resources;
    if (activeFilter === "favorites") {
      const favIds = getFavorites();
      filtered = resources.filter(r => favIds.includes(r.id));
    } else if (activeFilter !== "all") {
      filtered = resources.filter((r) => r.category === activeFilter);
    }

    // Затем по поисковому запросу
    if (searchQuery.trim() === "") {
      return filtered;
    }
    const query = searchQuery.toLowerCase();
    return filtered.filter(r => 
      r.title.toLowerCase().includes(query) || 
      r.description.toLowerCase().includes(query)
    );
  })();

  const categories: Array<{ value: Resource["category"] | "all" | "favorites"; label: string }> = [
    { value: "all", label: "Все" },
    { value: "favorites", label: "Избранное" },
    { value: "article", label: "Статьи" },
    { value: "exercise", label: "Упражнения" },
    { value: "meditation", label: "Медитации" },
    { value: "technique", label: "Техники" },
  ];

  return (
    <AuthGuard user={user}>
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Библиотека ресурсов</h1>
            <p className={styles.description}>
              Изучайте проверенные методики, упражнения и техники для профилактики и преодоления эмоционального выгорания
            </p>
          </div>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`${styles.filterButton} ${activeFilter === cat.value ? styles.active : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filteredResources.length > 0 ? (
            <div className={styles.grid}>
              {filteredResources.map((resource) => (
                <Link
                  key={resource.id}
                  to={`/resource/${resource.id}`}
                  className={styles.resourceCard}
                >
                  <div className={styles.imageContainer}>
                    <img src={resource.imageUrl} alt={resource.title} className={styles.resourceImage} />
                    <span className={styles.categoryBadge}>{getCategoryLabel(resource.category)}</span>
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.resourceTitle}>{resource.title}</h3>
                    <p className={styles.resourceDescription}>{resource.description}</p>
                    {resource.duration && (
                      <div className={styles.footer}>
                        <div className={styles.duration}>
                          <Clock className={styles.durationIcon} />
                          <span>{resource.duration}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Ресурсы не найдены</p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}