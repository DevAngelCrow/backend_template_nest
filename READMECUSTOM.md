<p  align="center">
<a style="display:inline-block; vertical-align:middle;"  href="http://nestjs.com/" target="blank"><img  src="https://nestjs.com/img/logo-small.svg"  width="120"  alt="Nest Logo"  /></a>
&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;
<a style="display:inline-block; vertical-align:middle;" href="http://nestjs.com/"  target="blank"><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg"  width="120"  alt="Prisma Logo"  /></a>
&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp; 
<a style="display:inline-block; vertical-align:middle;" href="http://nestjs.com/"  target="blank"><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"  width="120"  alt="Typescript logo"  /></a>
</p> 

# Nest Js (11) + Typescript + Prisma ORM (7v)

Esta plantilla cuenta con las tecnologias descritas para poder iniciar con un desarrollo rapido.
## Engines
#### Arquitectura hexagonal
#### Drive Domain Desing
## Configuración del inicial de la plantilla backend

### Requisitos

- Node versión >= 18.0.0
- npm versión >= 9.0.0

### Instalación

1 - Clonar el repositorio.

```
git clone https://github.com/DevAngelCrow/backend_template_nest.git
cd backend_template_nest
```

2 - Configurar el .env

```
cp .env.example .env.local
```

Configura las variables de entorno del archivo .env.local de acuerdo a tu necesidad.

3 - Procedemos a instalar dependencias, ejecutamos en consola dentro del directorio del repositorio el comando siguiente

```
npm install
```

4 - Dar permisos de superusuario a la carpeta husky si estas utilizando Linux

```
sudo chmod +x .husky/*
```

5 - Puede utilizar los siguientes scripts para iniciar el servidor según el modo de su convención:
###### development
```
npm run start:dev
```
###### watch mode
```
npm run start:dev
```
###### production mode
```
npm run start:dev
```
# Estructura general del directorio de carpetas y archivos del proyecto

```
📦 backend_template_nest
├── 📁 src
│    ├── 📦 modules
│    │    └── 📁 module
│    │    		 ├── 📁 domain
│	 │	  		 │		├── 📁 entities
│	 │	  		 │		├── 📁 repositories
│	 │	  		 │		├── 📁 value-objects
│	 │	  		 │		├── 📁 ports
│	 │	  		 │		├── 📁 enums
│	 │	  		 │		└── 📁 aggregates
│    │     		 ├── 📁 application
│	 │	   		 │    ├── 📁 dtos
|    |           |    ├── 📁 queries-repositories
|    |           |    ├── 📁 use-cases
|    |           |    └── 📁 services
│    │           └── 📁 infrastructure
|	 |	    	 		├── 📁 config
|	 |	  		 		├── 📁 controllers
|	 |	  		 		├── 📁 decorators
|	 |	  		 		├── 📁 dtos	
|	 |	  		 		|			├── 📁 http
|	 |	  		 		|			└── 📁 validators
|	 |	  		 		├── 📁 guards	
|	 |	  		 		├── 📁 implementation
|	 |	  		 		├── 📁 services
|	 |	  		       	└── 📁 strategies		
│    │    
│    ├── 📦 shared
|	 |	  ├── 📁 domain
|	 |	  ├── 📁 application
│    │    └── 📁 infrastructure
│    │
│    └── 📁 views
│         └── 📁 module
│
├── 📄 .env.example
├── 📄 .env.local
├── 📄 .eslint.config.ts
├── 📄 .gitignore
├── 📄 .prettierrc.json
├── 📄 .commitlint.config.ts
├── 📄 index.html
├── 📄 package.json
├── 📄 README.md
├── 📄 tsconfig.app.json
├── 📄 tsconfig.json
├── 📄 tsconfig.node.json
└── 📄 vite.config.ts
```

# Descripcion de carpetas y archivos de los directorios.

## Carpeta core

- 📂 assets/: Contiene recursos de estilos, multimedia y archivos estaticos globales de la aplicacion.

- 📂 components/: Contiene funciones reactivas creadas con Composition API de Vue 3, estos encapsulan logica que puede ser reutilizadas por los componentes de Vue.

- 📂 composables/: Contiene e incluye componentes Vue reutilizables, tales como Modales, DataTable, DatePicker etc.

- 📂 config/: Define configuraciones globales.

- 📂 directives/: Contiene directivas reutilizables para los componentes.

- 📂 interfaces/: Define interfaces a utilizar para la implementacion de tipados estrictos.

- 📂 layout/: Contiene el componente general del diseno general donde se visualiza todo el contenido de la aplicacion.

- 📂 router/: Define las rutas de la aplicacion con la tecnologia de Vue Router.

- 📂 services/: Contiene las funciones responsables para le ejecucion de peticiones http hacia API's internas o externas.

- 📂 store/: Implementa la gestión del estado global con Pinia.

- 📂 utils/: Contiene e incluye funciones de uso general, validadores, etc.

## Carpeta modules

- 📂 modules/: Contiene cada modulo que cuenta con una estructura de componentes, composables, rutas y vistas que se integran a la aplicacion global (Ejemplo: Auth...).

## Carpeta views

- 📂 views/: Contiene las vistas generales de la aplicacion.

## Archivos de directorio raiz.

- 📄 App.vue: Componente raíz que define la estructura base de la aplicación.

- 📄 main.ts: Archivo principal que inicializa Vue, configura plugins y monta la aplicacion.

- 📄 env.example: Archivo de ejemplo para definir variables de entorno necesarias para el proyecto.

- 📄 .git.ignore: Archivo el cual contiene las extensiones que se omiten al momento de realizar un commit del repositorio local y externo.

- 📄 index.html: Archivo que es el punto de entrada principal de la aplicacion en tiempo de desarrollo y sirve como plantilla para la generacion del HTML final durante la compilacion.

- 📄 package.json: Archivo que define la configuracion principal del proyecto(nombre, version, scripts, dependencias y configuraciones especificas del ecosistema JS)

- 📄 tsconfig.app.json, tsconfig.json, tsconfig.node.json: Archivos de configuracion de TypeScript el cual define las opciones del compilador global

- vite.config.ts: Archivo que define cómo se comporta Vite durante el desarrollo, build y preview. Es donde puedes extender funcionalidades, configurar plugins, establecer alias de rutas, entre otros.