// server/src/models/db.js
// Base de datos relacional en memoria con soporte de relaciones (1:N, N:M) y eliminación lógica (Soft Delete)

class RelationalDatabase {
  constructor() {
    this.actores = [];
    this.fuentes = [];
    this.senales = [];
    this.patronesCausales = [];
    this.simulaciones = [];
    this._initSeedData();
  }

  _initSeedData() {
    // 1. Actores Territoriales (Relación 1 a N con Señales)
    this.actores = [
      { id: 'act-01', nombre: 'Doña Marta', rol: 'Comerciante Almacén & Panadería La Unión', territorio: 'Barrio El Progreso', isDeleted: false, deletedAt: null },
      { id: 'act-02', nombre: 'Carlos Mendoza', rol: 'Dueño Taller Mecánico & Fletes', territorio: 'Barrio El Progreso', isDeleted: false, deletedAt: null },
      { id: 'act-03', nombre: 'Laura Gómez', rol: 'Coordinadora Comedor Comunitario Los Chicos', territorio: 'Barrio El Progreso', isDeleted: false, deletedAt: null },
      { id: 'act-04', nombre: 'Esteban Ramos', rol: 'Presidente Cooperativa Verduras Frescas', territorio: 'Región Cinturón Verde', isDeleted: false, deletedAt: null },
      { id: 'act-05', nombre: 'Secretaría de Desarrollo Social', rol: 'Gobierno Municipal / Fondos Públicos', territorio: 'Distrito 4', isDeleted: false, deletedAt: null }
    ];

    // 2. Fuentes de Datos Heterogéneas (Relación 1 a N con Señales)
    this.fuentes = [
      { id: 'fnt-01', nombre: 'Audios de WhatsApp Comunitario', formato: 'Audio / Texto Desestructurado', categoria: 'Voz Territorial', isDeleted: false, deletedAt: null },
      { id: 'fnt-02', nombre: 'Planilla de Ventas y Caja Almacén', formato: 'CSV Tabular', categoria: 'Métrica Financiera', isDeleted: false, deletedAt: null },
      { id: 'fnt-03', nombre: 'Portal de Datos Abiertos Municipal', formato: 'JSON / REST API Oficial', categoria: 'Estadística Pública', isDeleted: false, deletedAt: null },
      { id: 'fnt-04', nombre: 'Actas de Asambleas Barriales', formato: 'Texto Plano / Manuscrito', categoria: 'Deliberación Colectiva', isDeleted: false, deletedAt: null }
    ];

    // 3. Señales Dispersas (Pertenece a Actor y a FuenteDato)
    this.senales = [
      {
        id: 'sig-01',
        actorId: 'act-01',
        fuenteId: 'fnt-01',
        contenido: 'El flete de la harina subió un 28% y el camión no entrega si no pagamos en efectivo por adelantado.',
        tono: 'Alarma de Suministro',
        severidad: 'critica',
        impactoARS: 320000,
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date().toISOString()
      },
      {
        id: 'sig-02',
        actorId: 'act-02',
        fuenteId: 'fnt-01',
        contenido: 'Los vecinos piden fiado para arreglar camionetas de reparto. Ya acumulamos $630.000 en crédito informal incobrable.',
        tono: 'Tensión de Liquidez',
        severidad: 'critica',
        impactoARS: 630000,
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date().toISOString()
      },
      {
        id: 'sig-03',
        actorId: 'act-03',
        fuenteId: 'fnt-01',
        contenido: 'Pasamos de 85 a 140 raciones diarias de viandas por el encarecimiento de la canasta básica.',
        tono: 'Emergencia Alimentaria',
        severidad: 'alta',
        impactoARS: 180000,
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date().toISOString()
      },
      {
        id: 'sig-04',
        actorId: 'act-01',
        fuenteId: 'fnt-02',
        contenido: 'Planilla de ventas: Ventas nominales aumentaron 5%, pero costo de reposición subió 32%; margen neto real cayó a -0.9%.',
        tono: 'Quiebre Financiero Invisible',
        severidad: 'critica',
        impactoARS: 490000,
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date().toISOString()
      },
      {
        id: 'sig-05',
        actorId: 'act-05',
        fuenteId: 'fnt-03',
        contenido: 'El Fondo Municipal de Apoyo Pyme tiene $10.200.000 ARS inactivos por falta de proyectos formalmente presentados.',
        tono: 'Oportunidad de Política Pública',
        severidad: 'media',
        impactoARS: 10200000,
        isDeleted: false,
        deletedAt: null,
        createdAt: new Date().toISOString()
      }
    ];

    // 4. Patrones Causales Cruzados (Conectan N Señales)
    this.patronesCausales = [
      {
        id: 'pat-01',
        titulo: 'La Trampa del Margen Oculto por Flete Individual',
        descripcion: 'La inflación de flete atomizado absorbe el 42% del precio, destruyendo el margen real de los comercios pese a vender más.',
        severidad: 'critica',
        senalesIds: ['sig-01', 'sig-04'],
        isDeleted: false,
        deletedAt: null
      },
      {
        id: 'pat-02',
        titulo: 'El Comercio Barrial como Prestamista Informal Colapsado',
        descripcion: 'Ante la falta de bancarización (58.4%), el almacén absorbe el fiado vecinal ($630.000) descapitalizando su flujo de caja.',
        severidad: 'critica',
        senalesIds: ['sig-02', 'sig-03'],
        isDeleted: false,
        deletedAt: null
      },
      {
        id: 'pat-03',
        titulo: 'Paradoja de Recursos Públicos Ociosos',
        descripcion: 'El municipio cuenta con $10.2M ARS disponibles pero exige requisitos inaccesibles para el comerciante aislado.',
        severidad: 'alta',
        senalesIds: ['sig-05'],
        isDeleted: false,
        deletedAt: null
      }
    ];
  }

  // Métodos Relacionales y Soft-Delete

  // SEÑALES
  getAllSenales(includeDeleted = false) {
    const list = includeDeleted ? this.senales : this.senales.filter(s => !s.isDeleted);
    return list.map(s => this._populateSignal(s));
  }

  getSenalById(id, includeDeleted = false) {
    const s = this.senales.find(x => x.id === id && (includeDeleted || !x.isDeleted));
    return s ? this._populateSignal(s) : null;
  }

  createSenal(data) {
    const newSignal = {
      id: `sig-${Date.now().toString().slice(-5)}`,
      actorId: data.actorId,
      fuenteId: data.fuenteId,
      contenido: data.contenido,
      tono: data.tono || 'Alerta Territorial',
      severidad: data.severidad || 'media',
      impactoARS: Number(data.impactoARS) || 0,
      isDeleted: false,
      deletedAt: null,
      createdAt: new Date().toISOString()
    };
    this.senales.unshift(newSignal);
    return this._populateSignal(newSignal);
  }

  // ELIMINACIÓN LÓGICA (Soft Delete)
  softDeleteSenal(id) {
    const s = this.senales.find(x => x.id === id && !x.isDeleted);
    if (!s) return null;
    s.isDeleted = true;
    s.deletedAt = new Date().toISOString();
    return this._populateSignal(s);
  }

  // RESTAURACIÓN DE ELIMINACIÓN LÓGICA
  restoreSenal(id) {
    const s = this.senales.find(x => x.id === id && x.isDeleted);
    if (!s) return null;
    s.isDeleted = false;
    s.deletedAt = null;
    return this._populateSignal(s);
  }

  // ACTORES
  getAllActores(includeDeleted = false) {
    return includeDeleted ? this.actores : this.actores.filter(a => !a.isDeleted);
  }

  getActorById(id) {
    return this.actores.find(a => a.id === id);
  }

  // FUENTES
  getAllFuentes(includeDeleted = false) {
    return includeDeleted ? this.fuentes : this.fuentes.filter(f => !f.isDeleted);
  }

  // PATRONES CAUSALES
  getAllPatrones(includeDeleted = false) {
    const list = includeDeleted ? this.patronesCausales : this.patronesCausales.filter(p => !p.isDeleted);
    return list.map(p => ({
      ...p,
      senalesRelacionadas: p.senalesIds.map(sid => this.senales.find(s => s.id === sid)).filter(Boolean)
    }));
  }

  // Helper de Población Relacional (Join Actor + Fuente)
  _populateSignal(signal) {
    const actor = this.actores.find(a => a.id === signal.actorId) || null;
    const fuente = this.fuentes.find(f => f.id === signal.fuenteId) || null;
    const patrones = this.patronesCausales.filter(p => p.senalesIds.includes(signal.id));
    return {
      ...signal,
      actor,
      fuente,
      patronesAsociados: patrones
    };
  }
}

export const db = new RelationalDatabase();
