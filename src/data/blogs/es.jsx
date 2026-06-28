import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const esBlogPosts = [
    {
        id: 1,
        title: "Cómo el Escaneo de Alimentos, Nutri-Score y la Puntuación NOVA te Ayudan a Comer Más Sano",
        badge: "Salud y Nutrición",
        description: "Descubre cómo los escáneres de alimentos con IA utilizan el Nutri-Score y la clasificación NOVA para ayudarte a evitar alimentos ultraprocesados.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Respuesta Rápida: ¿Cómo mejoran Nutri-Score y la puntuación NOVA tus elecciones de alimentos?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        El <strong>Nutri-Score</strong> califica la calidad nutricional de los alimentos de la A a la E, ayudándote a identificar rápidamente opciones más saludables. La <strong>puntuación NOVA</strong> clasifica los alimentos según su grado de procesamiento, desde naturales (1) hasta ultraprocesados (4). Juntos, ayudan a los consumidores a evitar alimentos muy procesados y bajos en nutrientes, que están relacionados con la obesidad y enfermedades crónicas.
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">¿Qué es una app de escáner de alimentos y por qué necesitas una?</h3>
                <p>
                    Entender las etiquetas de ingredientes puede ser confuso. Un escáner de alimentos con IA como PureScan AI lee el código de barras o la lista de ingredientes de cualquier producto y lo analiza al instante. Contrasta los ingredientes con enormes bases de datos científicas para detectar azúcares ocultos, aditivos dañinos y alérgenos.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">¿Cómo ayuda la app PureScan AI a personalizar tu salud?</h3>
                <p>
                    A diferencia de los contadores de calorías genéricos, PureScan AI ofrece análisis de salud personalizados. Al ingresar tus condiciones de salud (como SOP, diabetes o desequilibrios hormonales) y alergias (como gluten, lácteos o frutos secos), la app proporciona una calificación de seguridad adaptada a ti.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4 font-medium">
                    <li><strong>Detección de alergias:</strong> Escanea en busca de alérgenos ocultos al instante.</li>
                    <li><strong>Monitoreo de condiciones:</strong> Señala ingredientes que pueden desencadenar inflamación o picos hormonales.</li>
                    <li><strong>Cumplimiento de dietas:</strong> Asegura que los productos sean verdaderamente veganos, keto o sin gluten.</li>
                </ul>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">¿Por qué debes evitar los alimentos ultraprocesados (Grupo NOVA 4)?</h3>
                <p>
                    Los alimentos ultraprocesados suelen contener formulaciones industriales con cinco o más ingredientes, como sabores artificiales, emulsionantes y conservantes. El alto consumo de alimentos del Grupo NOVA 4 está fuertemente asociado con un mayor riesgo de enfermedades cardiovasculares, síndrome metabólico y ciertos tipos de cáncer. Nuestro escáner te alerta inmediatamente cuando un producto entra en esta categoría de alto riesgo.
                </p>
            </div>
        )
    },
    {
        id: 2,
        title: "Escáner de Cosméticos: Cómo Saber Qué Cosméticos Son Seguros Para Ti",
        badge: "Seguridad en Cuidado de la Piel",
        description: "Aprende a detectar disruptores endocrinos, alérgenos y químicos tóxicos en tu maquillaje y productos de cuidado personal.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Search className="w-5 h-5 text-slate-700" />
                        Respuesta Rápida: ¿Cómo analiza un escáner de cosméticos los productos para la piel?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        Un <strong>escáner de cosméticos</strong> utiliza IA para leer la lista de ingredientes (INCI) en productos de maquillaje y cuidado de la piel. Identifica químicos dañinos, disruptores endocrinos y alérgenos al cruzarlos con bases de datos científicas como la FDA, EWG y ECHA. Califica al instante la seguridad del producto, ayudándote a evitar ingredientes tóxicos.
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">¿Qué cosméticos son buenos para ti?</h3>
                <p>
                    Los cosméticos más seguros son aquellos formulados sin disruptores endocrinos, carcinógenos y alérgenos severos. Los buenos cosméticos suelen tener listas de ingredientes transparentes y evitan químicos controvertidos. Sin embargo, "natural" no siempre significa seguro. La mejor manera de saber si son buenos es escanearlos y revisar el desglose científico de su composición química.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">¿Qué ingredientes tóxicos debes evitar en productos de cuidado personal?</h3>
                <p>
                    Al escanear tus cosméticos, presta mucha atención a las alertas sobre estos delincuentes comunes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabenos</strong>
                            <span className="text-xs text-slate-600">Usados como conservantes, conocidos por alterar la función hormonal.</span>
                        </div>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Ftalatos</strong>
                            <span className="text-xs text-slate-600">Se encuentran en fragancias sintéticas, ligados a problemas reproductivos.</span>
                        </div>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">PFAS (Químicos Eternos)</strong>
                            <span className="text-xs text-slate-600">Usados para resistencia al agua, altamente persistentes en el cuerpo.</span>
                        </div>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Liberadores de formaldehído</strong>
                            <span className="text-xs text-slate-600">Conservantes que liberan carcinógenos conocidos lentamente.</span>
                        </div>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">¿Cómo garantiza PureScan AI la seguridad de los ingredientes?</h3>
                <p>
                    PureScan AI actúa como tu escáner de toxicidad personal. Aprovecha datos científicos fiables de organizaciones globales líderes (FDA, EWG, EFSA, ECHA, IARC). Ya sea que estés escaneando un champú, una base de maquillaje o loción para bebés, la app proporciona alertas de riesgo reales y una calificación de seguridad basada en evidencias.
                </p>
            </div>
        )
    },
    {
        id: 3,
        title: "¿Son Precisas las Calificaciones de Alimentos? Cómo Nuestra App Determina si la Comida es Sana",
        badge: "Datos y Precisión",
        description: "Un análisis profundo sobre cómo las apps de escaneo calculan puntajes nutricionales y dan recomendaciones personalizadas.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">¿Cómo determinan los escáneres si un alimento es sano?</h3>
                <p className="mb-4">
                    Muchas personas se preguntan si las calificaciones de los alimentos son precisas. El conteo tradicional de calorías ignora la panorama general. Nuestra app va más allá de los macros básicos analizando el <strong>grado de procesamiento (clasificación NOVA)</strong> y cruzando ingredientes con bases de datos clínicas.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">¿Puede esta app ayudar con necesidades dietéticas específicas como alergias o dieta vegana?</h3>
                <p className="mb-4">
                    ¡Sí! PureScan AI no es un sistema genérico de talla única. Ofrecemos alertas altamente personalizadas para <strong>alergias, dietas veganas y sin gluten</strong>, asegurando que no consumas aditivos ocultos accidentalmente.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">¿Son imparciales las recomendaciones?</h3>
                <p>
                    Basamos nuestras puntuaciones de seguridad en datos científicos transparentes e independientes de entidades como la FDA y la EFSA, totalmente independientes de la influencia de marcas o publicidad.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "¿Son Tóxicos los Ingredientes de Mi Cuidado de Piel? Cómo Interpretar las Puntuaciones de Peligro",
        badge: "Ciencia de Ingredientes",
        description: "Desmitificando las listas de ingredientes INCI y las puntuaciones de peligro. Descubre si lo natural es siempre mejor.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">¿Son tóxicos los ingredientes de mi producto de skincare?</h3>
                <p className="mb-4">
                    Navegar por un verificador de ingredientes cosméticos puede ser abrumador. Los usuarios a menudo preguntan cómo interpretar las puntuaciones de riesgo. Cuando un producto es calificado como "malo", generalmente se debe a la presencia de <strong>disruptores endocrinos, irritantes o carcinógenos</strong>.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">¿Lo sintético es siempre malo y lo natural siempre seguro?</h3>
                <p className="mb-4">
                    Un gran error en el "clean beauty" es pensar que "sintético" siempre significa tóxico y "natural" seguro. Muchos aceites esenciales naturales pueden ser alérgenos severos, mientras que algunos ingredientes sintéticos creados en laboratorio son perfectamente seguros. Nuestra app decodifica la <strong>lista de ingredientes INCI</strong> basándose en seguridad científica, no solo en palabras de marketing.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">¿Puedo encontrar productos para mi tipo de piel específico?</h3>
                <p>
                    Más allá de la toxicidad básica, nuestro escáner de cosméticos ofrece recomendaciones personalizadas, ayudándote a evitar ingredientes que desencadenan específicamente tus sensibilidades de piel o condiciones como el eczema.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Cómo Leer Etiquetas Nutricionales Como un Profesional para Perder Peso y Comer Limpio",
        badge: "Alimentación Limpia",
        description: "¿Luchando con información nutricional compleja? Aprende a decodificar etiquetas al instante y evitar azúcares ocultos.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">¿Cómo se lee una etiqueta nutricional para perder peso?</h3>
                <p className="mb-4">
                    Al optimizar para la pérdida de peso, la mayoría solo mira las calorías. Sin embargo, para comer realmente limpio (clean eating), necesitas mirar los <strong>azúcares añadidos, grasas trans y aditivos ocultos</strong>. La lista de ingredientes es a menudo más importante que el panel nutricional.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">¿Cuál es la mejor app para comer limpio?</h3>
                <p className="mb-4">
                    Si buscas la mejor app para comer sano, necesitas una herramienta que no solo cuente calorías. <strong>PureScan AI</strong> analiza los ingredientes reales para detectar aditivos ultraprocesados. Al usarla, obtienes una puntuación de seguridad personalizada que te ayuda a encontrar alternativas más saludables en segundos.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">¿Cuáles son los beneficios de usar un analizador de ingredientes alimenticios?</h3>
                <p>
                    El principal beneficio es ahorrar tiempo y proteger tu salud. En lugar de memorizar nombres químicos complejos, PureScan AI hace el trabajo pesado. Ayuda a reducir la inflamación, manejar condiciones como el SOP y apegarte a tus metas dietéticas al exponer etiquetas de marketing engañosas.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "La Verdad Sobre el 'Clean Beauty': Ingredientes Naturales vs. Sintéticos",
        badge: "Belleza Limpia",
        description: "¿Son siempre seguros los cosméticos naturales? Desglosamos los mitos más grandes en la industria del clean beauty.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">¿Son mejores los cosméticos naturales que los sintéticos?</h3>
                <p className="mb-4">
                    Una pregunta muy común que se le hace a Gemini y ChatGPT es si los cosméticos naturales son intrínsecamente más seguros. La verdad es que "natural" no siempre significa no tóxico. La hiedra venenosa es natural, pero no te la pondrías en la cara. Muchos aceites esenciales causan reacciones alérgicas severas, mientras que muchos ingredientes creados en laboratorio son seguros y efectivos.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">¿Cómo puedo comprobar la toxicidad de los cosméticos con precisión?</h3>
                <p className="mb-4">
                    Para verificar tus cosméticos con precisión, necesitas un analizador de ingredientes imparcial. <strong>PureScan AI</strong> cruza cada elemento de la lista INCI con bases de datos confiables como el EWG y la FDA. Elimina las conjeturas resaltando al instante disruptores endocrinos y carcinógenos.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">¿Por qué usar PureScan AI en tu rutina de skincare?</h3>
                <p>
                    Al integrar PureScan AI en tu rutina diaria, ganas el beneficio de una transparencia total. Puedes proteger tu barrera cutánea, prevenir el envejecimiento prematuro causado por irritantes fuertes y asegurar que tus recomendaciones de cuidado de la piel sean genuinamente beneficiosas.
                </p>
            </div>
        )
    }
];
