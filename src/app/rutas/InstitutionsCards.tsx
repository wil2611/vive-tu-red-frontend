"use client";

import { useEffect, useState } from "react";
import type { Institution } from "./rutas.data";

interface InstitutionsCardsProps {
  institutions: Institution[];
}

export default function InstitutionsCards({ institutions }: InstitutionsCardsProps) {
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

  const valueOrFallback = (value?: string) => value?.trim() || "No disponible";

  useEffect(() => {
    if (!selectedInstitution) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedInstitution(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedInstitution]);

  return (
    <>
      <div className="rutas-institutions-grid">
        {institutions.map((inst) => (
          <button
            key={`${inst.name}-${inst.type}`}
            type="button"
            className="rutas-inst-card rutas-inst-card-button"
            onClick={() => setSelectedInstitution(inst)}
            aria-label={`Ver detalles de ${inst.name}`}
          >
            <div
              className="rutas-inst-icon"
              style={{ background: `${inst.badgeColor}14`, color: inst.badgeColor }}
            >
              {inst.icon}
            </div>
            <div className="rutas-inst-content">
              <div className="rutas-inst-head">
                <h4 className="rutas-inst-title">{inst.name}</h4>
                <span
                  className="badge rutas-inst-badge"
                  style={{ background: `${inst.badgeColor}14`, color: inst.badgeColor }}
                >
                  {inst.badge}
                </span>
              </div>
              <div className="rutas-inst-type">{inst.type}</div>
              <p className="rutas-inst-desc">{inst.desc}</p>
              <span className="rutas-inst-more">Ver informacion completa</span>
            </div>
          </button>
        ))}
      </div>

      {selectedInstitution ? (
        <div
          className="rutas-inst-modal-overlay"
          role="presentation"
          onClick={() => setSelectedInstitution(null)}
        >
          <article
            className="rutas-inst-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rutas-inst-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="rutas-inst-modal-head">
              <div
                className="rutas-inst-icon rutas-inst-modal-icon"
                style={{
                  background: `${selectedInstitution.badgeColor}14`,
                  color: selectedInstitution.badgeColor,
                }}
              >
                {selectedInstitution.icon}
              </div>
              <div className="rutas-inst-modal-header-text">
                <h4 id="rutas-inst-modal-title" className="rutas-inst-modal-title">
                  {selectedInstitution.name}
                </h4>
                <p className="rutas-inst-modal-type">{selectedInstitution.type}</p>
              </div>
              <button
                type="button"
                className="rutas-inst-modal-close"
                onClick={() => setSelectedInstitution(null)}
                aria-label="Cerrar ventana"
              >
                X
              </button>
            </header>

            <div className="rutas-inst-modal-body">
              <span
                className="badge rutas-inst-badge"
                style={{
                  background: `${selectedInstitution.badgeColor}14`,
                  color: selectedInstitution.badgeColor,
                }}
              >
                {selectedInstitution.badge}
              </span>
              <p className="rutas-inst-modal-description">{selectedInstitution.desc}</p>
              <dl className="rutas-inst-modal-data">
                <div>
                  <dt>Ubicacion</dt>
                  <dd>{valueOrFallback(selectedInstitution.ubicacion)}</dd>
                </div>
                <div>
                  <dt>Horario</dt>
                  <dd>{valueOrFallback(selectedInstitution.schedule)}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    {selectedInstitution.email ? (
                      <a className="rutas-inst-link" href={`mailto:${selectedInstitution.email}`}>
                        {selectedInstitution.email}
                      </a>
                    ) : (
                      "No disponible"
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Telefono</dt>
                  <dd>
                    {selectedInstitution.phone ? (
                      <a className="rutas-inst-link" href={`tel:${selectedInstitution.phone}`}>
                        {selectedInstitution.phone}
                      </a>
                    ) : (
                      "No disponible"
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
