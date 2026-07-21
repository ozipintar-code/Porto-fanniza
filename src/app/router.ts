// ── Lightweight URL router ──────────────────────────────────────────────────
// The app used to be pure client-state routing (no URL ever changed), which
// meant no project could be linked to directly, refreshing always landed on
// Home, and the browser's back/forward buttons did nothing. This gives every
// page a real, shareable URL using the native History API — no react-router
// dependency needed for a routing surface this small.
//
// URL scheme:
//   /                                  → home
//   /about                             → about
//   /projects                          → projects archive, no filter
//   /projects?filter=interior          → archive filtered to Interior Design
//   /projects?filter=visual-merch      → archive filtered to Visual Merchandising
//   /projects/:slug                    → a single project's detail page

import { useCallback, useEffect, useState } from "react";
import { getProjectBySlug, type Project } from "./data/projects";
import type { CategoryFilter } from "./ProjectsPage";

export type Route =
  | { name: "home" }
  | { name: "about" }
  | { name: "contact" }
  | { name: "projects"; filter?: CategoryFilter }
  | { name: "project"; project: Project };

const FILTER_TO_PARAM: Partial<Record<CategoryFilter, string>> = {
  Interior: "interior",
  VisualMerchandising: "visual-merch",
};
const PARAM_TO_FILTER: Record<string, CategoryFilter> = {
  interior: "Interior",
  "visual-merch": "VisualMerchandising",
};

export function routeToPath(route: Route): string {
  switch (route.name) {
    case "home":
      return "/";
    case "about":
      return "/about";
    case "contact":
      return "/contact";
    case "projects": {
      const param = route.filter ? FILTER_TO_PARAM[route.filter] : undefined;
      return param ? `/projects?filter=${param}` : "/projects";
    }
    case "project":
      return `/projects/${route.project.slug}`;
  }
}

function parseLocation(): Route {
  const { pathname, search } = window.location;
  const segments = pathname.split("/").filter(Boolean); // e.g. ["projects", "pavilliun"]

  if (segments[0] === "about") return { name: "about" };
  if (segments[0] === "contact") return { name: "contact" };

  if (segments[0] === "projects") {
    if (segments[1]) {
      const project = getProjectBySlug(segments[1]);
      if (project) return { name: "project", project };
      // Unknown slug — fall back to the archive rather than a dead page.
      return { name: "projects" };
    }
    const param = new URLSearchParams(search).get("filter");
    const filter = param ? PARAM_TO_FILTER[param] : undefined;
    return { name: "projects", filter };
  }

  return { name: "home" };
}

/**
 * Owns the current Route, keeps it in sync with the address bar (pushState
 * on navigation, popstate on back/forward), and restores whatever route
 * matches the URL the app was loaded or refreshed on.
 */
export function useRouter() {
  const [route, setRouteState] = useState<Route>(() => parseLocation());

  useEffect(() => {
    const onPopState = () => {
      const next = parseLocation();
      if (!(document as any).startViewTransition) {
        setRouteState(next);
      } else {
        (document as any).startViewTransition(() => {
          setRouteState(next);
        });
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((next: Route, { replace = false }: { replace?: boolean } = {}) => {
    const path = routeToPath(next);
    if (path !== window.location.pathname + window.location.search) {
      if (replace) window.history.replaceState(null, "", path);
      else window.history.pushState(null, "", path);
    }
    
    if (!(document as any).startViewTransition) {
      setRouteState(next);
      document.getElementById("page-scroll-root")?.scrollTo(0, 0);
    } else {
      (document as any).startViewTransition(() => {
        setRouteState(next);
        document.getElementById("page-scroll-root")?.scrollTo(0, 0);
      });
    }
  }, []);

  return { route, navigate };
}
