(() => {
"use strict";
const STORAGE_KEY = "usci-country-v1";
const countries = [
 {code:"AR",name:"Argentina",flag:"🇦🇷",lang:"es"},
 {code:"BO",name:"Bolivia",flag:"🇧🇴",lang:"es"},
 {code:"BR",name:"Brasil",flag:"🇧🇷",lang:"pt"},
 {code:"CL",name:"Chile",flag:"🇨🇱",lang:"es"},
 {code:"CO",name:"Colombia",flag:"🇨🇴",lang:"es"},
 {code:"EC",name:"Ecuador",flag:"🇪🇨",lang:"es"},
 {code:"PY",name:"Paraguay",flag:"🇵🇾",lang:"es"},
 {code:"PE",name:"Perú",flag:"🇵🇪",lang:"es"},
 {code:"UY",name:"Uruguay",flag:"🇺🇾",lang:"es"},
 {code:"VE",name:"Venezuela",flag:"🇻🇪",lang:"es"},
 {code:"GY",name:"Guyana",flag:"🇬🇾",lang:"en"},
 {code:"SR",name:"Surinam",flag:"🇸🇷",lang:"nl"}
];
const byCode = new Map(countries.map(c=>[c.code,c]));
const rows = [
["Inicio","Início","Home","Home"],
["iPhone sellados","iPhones lacrados","Sealed iPhones","Verzegelde iPhones"],
["iPhone seminuevos","iPhones seminovos","Pre-owned iPhones","Tweedehands iPhones"],
["Mayoristas","Atacado","Wholesale","Groothandel"],
["Sudamérica","América do Sul","South America","Zuid-Amerika"],
["Brasil","Brasil","Brazil","Brazilië"],
["Perú","Peru","Peru","Peru"],
["Surinam","Suriname","Suriname","Suriname"],
["Ecuador","Equador","Ecuador","Ecuador"],
["Otro","Outro","Other","Anders"],
["US CELLULAR IMPORT · SUDAMÉRICA","US CELLULAR IMPORT · AMÉRICA DO SUL","US CELLULAR IMPORT · SOUTH AMERICA","US CELLULAR IMPORT · ZUID-AMERIKA"],
["Importaciones","Importações","Imports","Import"],
["De","de","of","van"],
["Telefonía","Telefonia","Mobile phones","Mobiele telefonie"],
["Móvil","Móvel","Mobile","Mobiel"],
["iPhone sellados y seminuevos para comercios y compradores de Sudamérica. Elegí un modelo y prepará tu consulta comercial.","iPhones lacrados e seminovos para lojas e compradores da América do Sul. Escolha um modelo e prepare sua consulta comercial.","Sealed and pre-owned iPhones for retailers and buyers across South America. Choose a model and prepare your business inquiry.","Verzegelde en tweedehands iPhones voor winkels en inkopers in Zuid-Amerika. Kies een model en stel uw zakelijke aanvraag samen."],
["Explorar catálogo","Explorar catálogo","Explore catalog","Catalogus bekijken"],
["LOGÍSTICA","LOGÍSTICA","LOGISTICS","LOGISTIEK"],
["Del depósito al avión.","Do depósito ao avião.","From warehouse to aircraft.","Van magazijn naar vliegtuig."],
["Así viaja un pedido: se carga, se despacha y despega rumbo a Sudamérica.","Veja como um pedido viaja: é carregado, despachado e parte rumo à América do Sul.","See how an order travels: it is loaded, dispatched and flown to South America.","Zo reist een bestelling: deze wordt geladen, verzonden en naar Zuid-Amerika gevlogen."],
["Carga","Carregamento","Loading","Laden"],
["Despacho","Despacho","Dispatch","Verzending"],
["Despegue","Decolagem","Takeoff","Vertrek"],
["Ilustración del proceso. Tiempos, rutas y logística se confirman con la empresa.","Ilustração do processo. Prazos, rotas e logística devem ser confirmados com a empresa.","Illustration of the process. Timing, routes and logistics must be confirmed with the company.","Illustratie van het proces. Tijden, routes en logistiek moeten door het bedrijf worden bevestigd."],
["EXPLORÁ EL CATÁLOGO","EXPLORE O CATÁLOGO","EXPLORE THE CATALOG","ONTDEK DE CATALOGUS"],
["Elegí tu iPhone.","Escolha seu iPhone.","Choose your iPhone.","Kies je iPhone."],
["Dos categorías, una búsqueda más simple.","Duas categorias, uma busca mais simples.","Two categories, one simpler search.","Twee categorieën, eenvoudiger zoeken."],
["Nuevos","Novos","New","Nieuw"],
["sellados","lacrados","sealed","verzegeld"],
["Explorar modelos","Explorar modelos","Explore models","Bekijk modellen"],
["Usados · 6 meses de garantía","Usados · 6 meses de garantia","Pre-owned · 6-month warranty","Tweedehands · 6 maanden garantie"],
["seminuevos","seminovos","pre-owned","tweedehands"],
["CATÁLOGO / EQUIPOS NUEVOS","CATÁLOGO / EQUIPAMENTOS NOVOS","CATALOG / NEW DEVICES","CATALOGUS / NIEUWE TOESTELLEN"],
["iPhone sellados.","iPhones lacrados.","Sealed iPhones.","Verzegelde iPhones."],
["Mínimo total por pedido: 50 pcs, combinando modelos.","Pedido mínimo total: 50 unidades, combinando modelos.","Minimum total order: 50 pcs, across combined models.","Minimale totale bestelling: 50 stuks, gecombineerd over meerdere modellen."],
["Explorá los modelos nuevos. Consultá capacidades, colores, precios y disponibilidad.","Explore os modelos novos. Consulte capacidades, cores, preços e disponibilidade.","Browse new models. Ask about storage, colors, pricing and availability.","Bekijk de nieuwe modellen. Vraag naar opslagcapaciteit, kleuren, prijzen en beschikbaarheid."],
["Modelos ilustrativos. Los precios y la disponibilidad deben ser confirmados por la empresa.","Modelos ilustrativos. Preços e disponibilidade devem ser confirmados pela empresa.","Illustrative models. Prices and availability must be confirmed by the company.","Voorbeeldmodellen. Prijzen en beschikbaarheid moeten door het bedrijf worden bevestigd."],
["CATÁLOGO / EQUIPOS USADOS","CATÁLOGO / EQUIPAMENTOS USADOS","CATALOG / PRE-OWNED DEVICES","CATALOGUS / TWEEDEHANDS TOESTELLEN"],
["iPhone seminuevos.","iPhones seminovos.","Pre-owned iPhones.","Tweedehands iPhones."],
["Equipos usados con 6 meses de garantía, según lo informado por US Cellular Import. Consultá estado, batería y disponibilidad.","Aparelhos usados com 6 meses de garantia, conforme informado pela US Cellular Import. Consulte estado, bateria e disponibilidade.","Pre-owned devices with a 6-month warranty, as stated by US Cellular Import. Ask about condition, battery health and availability.","Gebruikte toestellen met 6 maanden garantie, volgens US Cellular Import. Vraag naar de staat, batterijconditie en beschikbaarheid."],
["La cobertura y condiciones de la garantía deben confirmarse con la empresa.","A cobertura e as condições da garantia devem ser confirmadas com a empresa.","Warranty coverage and terms must be confirmed with the company.","De dekking en voorwaarden van de garantie moeten door het bedrijf worden bevestigd."],
["CONTÁCTANOS","FALE CONOSCO","CONTACT US","NEEM CONTACT OP"],
["¿Qué equipo estás buscando?","Qual aparelho você está procurando?","What device are you looking for?","Welk toestel zoek je?"],
["Podés preparar una consulta comercial sin comprometer una compra.","Você pode preparar uma consulta comercial sem se comprometer com uma compra.","You can prepare a business inquiry without committing to a purchase.","U kunt een zakelijke aanvraag voorbereiden zonder aankoopverplichting."],
["Hacer una consulta","Fazer uma consulta","Make an inquiry","Aanvraag doen"],
["Volver al catálogo","Voltar ao catálogo","Back to catalog","Terug naar de catalogus"],
["Un sitio pensado para Sudamérica.","Um site pensado para a América do Sul.","A website designed for South America.","Een website voor Zuid-Amerika."],
["La versión definitiva podrá incluir información específica por país. El cliente deberá confirmar mercados, logística y condiciones antes de publicarlas.","A versão final poderá incluir informações específicas por país. O cliente deverá confirmar mercados, logística e condições antes da publicação.","The final version can include country-specific information. Markets, logistics and terms must be confirmed by the client before publication.","De definitieve versie kan landspecifieke informatie bevatten. Markten, logistiek en voorwaarden moeten vóór publicatie door de klant worden bevestigd."],
["Elegí tu país","Escolha seu país","Choose your country","Kies je land"],
["US CELLULAR IMPORT / PRODUCTOS","US CELLULAR IMPORT / PRODUTOS","US CELLULAR IMPORT / PRODUCTS","US CELLULAR IMPORT / PRODUCTEN"],
["Detalle del","Detalhes do","Product","Product"],
["producto.","produto.","details.","details."],
["Conocé el equipo y sus características antes de solicitar una cotización.","Conheça o aparelho e suas características antes de solicitar uma cotação.","Explore the device and its features before requesting a quote.","Bekijk het toestel en de kenmerken voordat u een offerte aanvraagt."],
["Imagen no disponible","Imagem indisponível","Image unavailable","Afbeelding niet beschikbaar"],
["Fotografía del producto","Foto do produto","Product photo","Productfoto"],
["Precio a consultar","Preço sob consulta","Price on request","Prijs op aanvraag"],
["Características","Características","Specifications","Kenmerken"],
["Stock y precio final sujetos a confirmación.","Estoque e preço final sujeitos à confirmação.","Stock and final price subject to confirmation.","Voorraad en definitieve prijs onder voorbehoud van bevestiging."],
["Consultá colores, capacidades y disponibilidad.","Consulte cores, capacidades e disponibilidade.","Ask about colors, storage options and availability.","Vraag naar kleuren, opslagcapaciteiten en beschikbaarheid."],
["Condiciones comerciales acordadas con el importador.","Condições comerciais acordadas com o importador.","Commercial terms to be agreed with the importer.","Commerciële voorwaarden zoals overeengekomen met de importeur."],
["Consultar este equipo","Consultar este aparelho","Enquire about this device","Informeer naar dit toestel"],
["Seleccioná este modelo para incluirlo en tu solicitud de cotización.","Selecione este modelo para incluí-lo em sua solicitação de cotação.","Select this model to include it in your quote request.","Selecteer dit model om het aan uw offerteaanvraag toe te voegen."],
["Agregar al carrito","Adicionar ao carrinho","Add to cart","Toevoegen aan winkelwagen"],
["Ir al checkout","Ir para o checkout","Go to checkout","Naar afrekenen"],
["Importaciones de Telefonía Móvil.","Importação de telefonia móvel.","Mobile phone imports.","Import van mobiele telefoons."],
["Catálogo informativo y consultas comerciales en español.","Catálogo informativo e consultas comerciais em português.","Product catalog and business inquiries in English.","Productcatalogus en zakelijke aanvragen in het Nederlands."],
["Catálogo","Catálogo","Catalog","Catalogus"],
["Contacto","Contato","Contact","Contact"],
["Catálogo sujeto a confirmación de inventario","Catálogo sujeito à confirmação de estoque","Catalog subject to inventory confirmation","Catalogus onder voorbehoud van voorraadbevestiging"],
["Tu consulta","Sua consulta","Your inquiry","Uw aanvraag"],
["Precios:","Preços:","Prices:","Prijzen:"],
["a cotizar con el importador. Este carrito sirve para preparar la consulta.","sob consulta com o importador. Este carrinho serve para preparar a consulta.","to be quoted by the importer. This cart is used to prepare your inquiry.","op aanvraag bij de importeur. Deze winkelwagen is bedoeld om uw aanvraag voor te bereiden."],
["Solicitar cotización","Solicitar cotação","Request a quote","Offerte aanvragen"],
["Vaciar carrito","Esvaziar carrinho","Empty cart","Winkelwagen legen"],
["Consulta comercial","Consulta comercial","Business inquiry","Zakelijke aanvraag"],
["Nombre y apellido","Nome e sobrenome","Full name","Voor- en achternaam"],
["Empresa / comercio","Empresa / loja","Company / retailer","Bedrijf / winkel"],
["País","País","Country","Land"],
["Seleccionar país","Selecionar país","Select country","Selecteer land"],
["WhatsApp o correo","WhatsApp ou e-mail","WhatsApp or email","WhatsApp of e-mail"],
["Observaciones","Observações","Notes","Opmerkingen"],
["Copiar consulta para enviar","Copiar consulta para enviar","Copy inquiry to send","Kopieer aanvraag om te verzenden"],
["Esta maqueta no envía mensajes: copiaremos el texto para que puedas probar el proceso. El WhatsApp o correo real se conecta cuando el cliente lo confirme.","Este protótipo não envia mensagens: vamos copiar o texto para que você possa testar o processo. O WhatsApp ou e-mail oficial será conectado quando a empresa confirmar.","This preview does not send messages. It copies the text so you can test the process. The company's official WhatsApp or email will be connected once confirmed.","Deze demoversie verstuurt geen berichten. De tekst wordt gekopieerd zodat u het proces kunt testen. Het officiële WhatsApp- of e-mailadres wordt gekoppeld zodra het bedrijf dit bevestigt."],
["Consultar precio","Consultar preço","Ask for price","Prijs opvragen"],
["Mínimo total: 50 pcs entre todos los modelos","Mínimo total: 50 unidades entre todos os modelos","50 pcs minimum across all models","Minimaal 50 stuks voor alle modellen samen"],
["Ver detalles","Ver detalhes","View details","Details bekijken"],
["No hay modelos de esta categoría que coincidan con la búsqueda.","Nenhum modelo desta categoria corresponde à busca.","No models in this category match your search.","Geen modellen in deze categorie komen overeen met uw zoekopdracht."],
["Precio a cotizar · combiná modelos","Preço sob consulta · combine modelos","Quote on request · combine models","Prijs op aanvraag · combineer modellen"],
["Precio a cotizar · combiná modelos libremente","Preço sob consulta · combine modelos livremente","Quote on request · mix models freely","Prijs op aanvraag · combineer modellen naar wens"],
["Tu carrito está vacío.","Seu carrinho está vazio.","Your cart is empty.","Uw winkelwagen is leeg."],
["Agregá un producto desde el catálogo.","Adicione um produto do catálogo.","Add a product from the catalog.","Voeg een product toe vanuit de catalogus."],
["Fotografía ilustrativa del modelo","Foto ilustrativa do modelo","Illustrative photo of the model","Illustratieve foto van het model"],
["Reducir fotografía","Reduzir imagem","Zoom out","Foto verkleinen"],
["Ampliar fotografía","Ampliar imagem","Zoom in","Foto vergroten"],
["Ver fotografía ","Ver foto ","View photo ","Foto bekijken "],
["Modelo","Modelo","Model","Model"],
["Estado / categoría","Estado / categoria","Condition / category","Staat / categorie"],
["Disponibilidad","Disponibilidade","Availability","Beschikbaarheid"],
["A confirmar","A confirmar","To be confirmed","Te bevestigen"],
["Precio","Preço","Price","Prijs"],
["A cotizar","Sob consulta","Quote on request","Offerte op aanvraag"],
["Pedido mínimo","Pedido mínimo","Minimum order","Minimale bestelling"],
["50 unidades en total entre todos los modelos","50 unidades no total entre todos os modelos","50 units total across all models","50 stuks in totaal over alle modellen"],
["Podés combinar diferentes equipos hasta llegar al mínimo.","Você pode combinar diferentes aparelhos até atingir o mínimo.","You can combine different devices to reach the minimum.","U kunt verschillende toestellen combineren om het minimum te bereiken."],
["Garantía","Garantia","Warranty","Garantie"],
["6 meses","6 meses","6 months","6 maanden"],
["Agregar al carrito y continuar al checkout","Adicionar ao carrinho e continuar para o checkout","Add to cart and continue to checkout","Toevoegen aan winkelwagen en doorgaan naar afrekenen"],
["No se realiza ningún cobro online. El checkout prepara una solicitud de cotización.","Nenhum pagamento é realizado online. O checkout prepara uma solicitação de cotação.","No online payment is taken. Checkout prepares a quote request.","Er wordt geen online betaling uitgevoerd. Het afrekenen bereidt een offerteaanvraag voor."],
["Producto no encontrado","Produto não encontrado","Product not found","Product niet gevonden"],
["Podés regresar al catálogo para explorar los modelos.","Você pode voltar ao catálogo para explorar os modelos.","You can return to the catalog to browse the models.","U kunt teruggaan naar de catalogus om de modellen te bekijken."],
["Ver catálogo","Ver catálogo","View catalog","Catalogus bekijken"],
["Capacidades y colores a consultar","Capacidades e cores sob consulta","Ask about storage and colors","Opslagcapaciteiten en kleuren op aanvraag"],
["6 meses de garantía · Consultar estado y batería","6 meses de garantia · Consulte estado e bateria","6-month warranty · Ask about condition and battery health","6 maanden garantie · Vraag naar staat en batterijconditie"],
["Carrito / Checkout","Carrinho / Checkout","Cart / Checkout","Winkelwagen / Afrekenen"],
["← Seguir viendo productos","← Continuar vendo produtos","← Continue browsing products","← Verder winkelen"],
["Finalizar consulta","Finalizar consulta","Complete inquiry","Aanvraag afronden"],
["Pedido mínimo total: 50 pcs entre todos los productos. Podés combinar diferentes modelos y elegir cuántos equipos de cada uno.","Pedido mínimo total: 50 unidades entre todos os produtos. Você pode combinar diferentes modelos e escolher a quantidade de cada um.","Minimum total order: 50 pcs across all products. You can combine different models and choose how many units of each.","Minimale totale bestelling: 50 stuks van alle producten samen. U kunt verschillende modellen combineren en per model het aantal kiezen."],
["Datos del comprador","Dados do comprador","Buyer information","Gegevens van de koper"],
["Preparar solicitud de cotización","Preparar solicitação de cotação","Prepare quote request","Offerteaanvraag voorbereiden"],
["La consulta está lista. Como todavía no se configuró el contacto oficial del importador, podés copiarla para enviarla manualmente.","A consulta está pronta. Como o contato oficial do importador ainda não foi configurado, você pode copiá-la para enviar manualmente.","Your inquiry is ready. Since the importer's official contact has not been configured yet, you can copy it and send it manually.","Uw aanvraag is klaar. Omdat het officiële contact van de importeur nog niet is ingesteld, kunt u deze kopiëren en handmatig verzenden."],
["Copiar consulta","Copiar consulta","Copy inquiry","Aanvraag kopiëren"],
["Resumen del carrito","Resumo do carrinho","Cart summary","Winkelwagenoverzicht"],
["a cotizar. El precio final, stock, impuestos, envíos y condiciones comerciales se confirmarán con US Cellular Import.","sob consulta. O preço final, estoque, impostos, frete e condições comerciais serão confirmados pela US Cellular Import.","to be quoted. Final pricing, stock, taxes, shipping and commercial terms will be confirmed by US Cellular Import.","op aanvraag. De definitieve prijs, voorraad, belastingen, verzending en commerciële voorwaarden worden bevestigd door US Cellular Import."],
["Agregar más productos","Adicionar mais produtos","Add more products","Meer producten toevoegen"],
["Catálogo de demostración · Precios y stock sujetos a confirmación","Catálogo demonstrativo · Preços e estoque sujeitos à confirmação","Demo catalog · Prices and stock subject to confirmation","Democatalogus · Prijzen en voorraad onder voorbehoud van bevestiging"],
["Eliminar","Remover","Remove","Verwijderen"],
["Consulta copiada.","Consulta copiada.","Inquiry copied.","Aanvraag gekopieerd."],
["Seleccioná y copiá manualmente el texto de la consulta.","Selecione e copie manualmente o texto da consulta.","Select and copy the inquiry text manually.","Selecteer en kopieer de aanvraagtekst handmatig."],
["Disminuir cantidad","Diminuir quantidade","Decrease quantity","Aantal verlagen"],
["Cantidad de ","Quantidade de ","Quantity of ","Aantal van "],
["Aumentar cantidad","Aumentar quantidade","Increase quantity","Aantal verhogen"],
["Opcional","Opcional","Optional","Optioneel"],
["Contacto para responderte","Contato para retorno","Contact details for a reply","Contactgegevens voor reactie"],
["Colores, capacidades, cantidades o consultas","Cores, capacidades, quantidades ou dúvidas","Colors, storage, quantities or questions","Kleuren, opslagcapaciteiten, aantallen of vragen"],
["Tu nombre","Seu nome","Your name","Uw naam"],
["Nombre del negocio","Nome da empresa","Business name","Bedrijfsnaam"],
["Número o correo","Número ou e-mail","Phone number or email","Telefoonnummer of e-mail"],
["Modelos y cantidades que necesitás","Modelos e quantidades desejados","Models and quantities you need","Gewenste modellen en aantallen"],
["Países de Sudamérica; cobertura comercial y logística a confirmar","Países da América do Sul; cobertura comercial e logística a confirmar","South American countries; commercial coverage and logistics to be confirmed","Landen in Zuid-Amerika; commerciële dekking en logistiek moeten worden bevestigd"],
["Navegación principal","Navegação principal","Main navigation","Hoofdnavigatie"],
["Cambiar tema","Alterar tema","Change theme","Thema wijzigen"],
["Buscar productos","Buscar produtos","Search products","Producten zoeken"],
["Abrir carrito","Abrir carrinho","Open cart","Winkelwagen openen"],
["Abrir menú","Abrir menu","Open menu","Menu openen"],
["Carrito de cotización","Carrinho de cotação","Quote cart","Offertewinkelwagen"],
["Cerrar carrito","Fechar carrinho","Close cart","Winkelwagen sluiten"],
["Solicitud de cotización","Solicitação de cotação","Quote request","Offerteaanvraag"],
["Cerrar formulario","Fechar formulário","Close form","Formulier sluiten"],
["Consulta copiada. Podés pegarla en un mensaje. Falta conectar el canal oficial de la empresa.","Consulta copiada. Você pode colá-la em uma mensagem. Falta conectar o canal oficial da empresa.","Inquiry copied. You can paste it into a message. The company's official contact channel still needs to be connected.","Aanvraag gekopieerd. U kunt deze in een bericht plakken. Het officiële communicatiekanaal van het bedrijf moet nog worden gekoppeld."],
["No se pudo copiar automáticamente. Revisá los datos del formulario antes de enviarlos.","Não foi possível copiar automaticamente. Confira os dados do formulário antes de enviar.","Could not copy automatically. Review the form details before sending.","Automatisch kopiëren is niet gelukt. Controleer de formuliergegevens voordat u ze verzendt."],
["Cambiar país","Alterar país","Change country","Land wijzigen"],
["Seleccioná tu país","Selecione seu país","Select your country","Selecteer uw land"],
["Elegí tu país para ver la página en tu idioma.","Escolha seu país para ver o site no seu idioma.","Choose your country to view the website in your language.","Kies uw land om de website in uw taal te bekijken."],
["La selección se guarda en este dispositivo y podés cambiarla cuando quieras.","A seleção fica salva neste dispositivo e pode ser alterada quando quiser.","Your selection is saved on this device and can be changed at any time.","Uw keuze wordt op dit apparaat opgeslagen en kan op elk moment worden gewijzigd."],
["Cerrar selector de país","Fechar seleção de país","Close country selector","Landkeuze sluiten"],
["Bandera de ","Bandeira de ","Flag of ","Vlag van "],
["Imagen ilustrativa de ","Imagem ilustrativa de ","Illustrative image of ","Illustratieve afbeelding van "],
["Consultá las capacidades, colores, condiciones y disponibilidad con la empresa.","Consulte capacidades, cores, condições e disponibilidade com a empresa.","Ask the company about storage, colors, terms and availability.","Vraag het bedrijf naar opslagcapaciteit, kleuren, voorwaarden en beschikbaarheid."],
["Hola US Cellular Import.","Olá, US Cellular Import.","Hello US Cellular Import.","Hallo US Cellular Import."],
["Quiero solicitar una cotización.","Quero solicitar uma cotação.","I would like to request a quote.","Ik wil graag een offerte aanvragen."],
["Consulta:","Consulta:","Inquiry:","Aanvraag:"],
["Nombre:","Nome:","Name:","Naam:"],
["Empresa:","Empresa:","Company:","Bedrijf:"],
["País:","País:","Country:","Land:"],
["Contacto:","Contato:","Contact:","Contact:"],
["Observaciones:","Observações:","Notes:","Opmerkingen:"],
["PRODUCTOS:","PRODUTOS:","PRODUCTS:","PRODUCTEN:"],
["Información comercial general","Informações comerciais gerais","General business information","Algemene zakelijke informatie"],
["Productos seleccionados: ","Produtos selecionados: ","Selected products: ","Geselecteerde producten: "],
["Consulta general sobre productos y distribución. Pedido mínimo: 50 unidades combinadas.","Consulta geral sobre produtos e distribuição. Pedido mínimo: 50 unidades combinadas.","General inquiry about products and distribution. Minimum order: 50 combined units.","Algemene aanvraag over producten en distributie. Minimale bestelling: 50 gecombineerde stuks."],
["Se requieren al menos ","São necessárias pelo menos ","At least ","Er zijn minimaal "],
[" unidades para solicitar cotización de productos."," unidades para solicitar cotação de produtos."," units are required to request a product quote."," stuks nodig om een productofferte aan te vragen."],
["Mínimo total: ","Mínimo total: ","Minimum total: ","Minimum totaal: "],
[" pcs. Llevás "," pcs. Você tem "," pcs. You have "," stuks. U heeft "],
["; faltan ","; faltam ","; ","; nog "],
[". Sumá distintos modelos para completar el pedido.",". Combine diferentes modelos para completar o pedido."," remaining. Add different models to complete the order."," resterend. Combineer verschillende modellen om de bestelling compleet te maken."],
["Total combinado: ","Total combinado: ","Combined total: ","Gecombineerd totaal: "],
[" de "," de "," of "," van "],
[" pcs. Faltan "," pcs. Faltam "," pcs. "," stuks. "],
[" unidades. Podés combinar distintos modelos."," unidades. Você pode combinar diferentes modelos."," units. You can combine different models."," stuks. U kunt verschillende modellen combineren."],
[" pcs. Cumplís el mínimo de "," pcs. Você atingiu o mínimo de "," pcs. You meet the minimum of "," stuks. U voldoet aan het minimum van "],
[" unidades."," unidades."," units."," stuks."],
["Mínimo total: ","Mínimo total: ","Minimum total: ","Minimum totaal: "],
[" pcs. Alcanzaste el mínimo combinado de "," pcs. Você atingiu o mínimo combinado de "," pcs. You have reached the combined minimum of "," stuks. U heeft het gecombineerde minimum van "],
[" unidades."," unidades."," units."," stuks."]
];
const dictionaries = {pt:{},en:{},nl:{}};
for (const row of rows) { dictionaries.pt[row[0]]=row[1];dictionaries.en[row[0]]=row[2];dictionaries.nl[row[0]]=row[3]; }
const originalText = new WeakMap(), renderedText = new WeakMap();
const originalAttrs = new WeakMap(), renderedAttrs = new WeakMap();
let activeCountry = null, language = "es";
const initialTitle = document.title;
const descriptionMeta = document.querySelector('meta[name="description"]');
const initialDescription = descriptionMeta ? descriptionMeta.getAttribute("content") : "";
function countryLabel(country) {
 const names = {
  AR:["Argentina","Argentina","Argentina","Argentinië"],
  BO:["Bolivia","Bolivia","Bolivia","Bolivia"],
  BR:["Brasil","Brasil","Brazil","Brazilië"],
  CL:["Chile","Chile","Chile","Chili"],
  CO:["Colombia","Colômbia","Colombia","Colombia"],
  EC:["Ecuador","Equador","Ecuador","Ecuador"],
  PY:["Paraguay","Paraguai","Paraguay","Paraguay"],
  PE:["Perú","Peru","Peru","Peru"],
  UY:["Uruguay","Uruguai","Uruguay","Uruguay"],
  VE:["Venezuela","Venezuela","Venezuela","Venezuela"],
  GY:["Guyana","Guiana","Guyana","Guyana"],
  SR:["Surinam","Suriname","Suriname","Suriname"]
 };
 return (names[country.code]||[country.name,country.name,country.name,country.name])[({es:0,pt:1,en:2,nl:3}[language]||0)];
}
function translateString(value) {
 if (typeof value !== "string" || language === "es" || !value) return value;
 const map = dictionaries[language] || {};
 const leading = value.match(/^\s*/)?.[0] || "";
 const trailing = value.match(/\s*$/)?.[0] || "";
 const core = value.slice(leading.length, value.length-trailing.length);
 if (Object.prototype.hasOwnProperty.call(map,core)) return leading+map[core]+trailing;
 let out = core;
 const fragments = [
  ["Hola US Cellular Import.",map["Hola US Cellular Import."]],
  ["Quiero solicitar una cotización.",map["Quiero solicitar una cotización."]],
  ["Consulta:",map["Consulta:"]],["Nombre:",map["Nombre:"]],["Empresa:",map["Empresa:"]],
  ["País:",map["País:"]],["Contacto:",map["Contacto:"]],["Observaciones:",map["Observaciones:"]],
  ["PRODUCTOS:",map["PRODUCTOS:"]],["Información comercial general",map["Información comercial general"]],
  ["Productos seleccionados: ",map["Productos seleccionados: "]],
  ["Consulta general sobre productos y distribución. Pedido mínimo: 50 unidades combinadas.",map["Consulta general sobre productos y distribución. Pedido mínimo: 50 unidades combinadas."]],
  ["Imagen ilustrativa de ",map["Imagen ilustrativa de "]],
  ["Consultá las capacidades, colores, condiciones y disponibilidad con la empresa.",map["Consultá las capacidades, colores, condiciones y disponibilidad con la empresa."]],
  ["Capacidades y colores a consultar",map["Capacidades y colores a consultar"]],
  ["6 meses de garantía · Consultar estado y batería",map["6 meses de garantía · Consultar estado y batería"]],
  ["Precio a consultar",map["Precio a consultar"]],
  ["Precio a cotizar · combiná modelos libremente",map["Precio a cotizar · combiná modelos libremente"]],
  ["Precio a cotizar · combiná modelos",map["Precio a cotizar · combiná modelos"]],
  ["Mínimo total: 50 pcs entre todos los modelos",map["Mínimo total: 50 pcs entre todos los modelos"]],
  ["Se requieren al menos ",map["Se requieren al menos "]],
  [" unidades para solicitar cotización de productos.",map[" unidades para solicitar cotización de productos."]]
 ];
 for (const [from,to] of fragments) if (from && to) out=out.split(from).join(to);
 const dynamic = [
  [/^Mínimo total: (\d+) pcs\. Llevás (\d+); faltan (\d+)\. Sumá distintos modelos para completar el pedido\.$/,
   {pt:"Mínimo total: $1 pcs. Você tem $2; faltam $3. Combine diferentes modelos para completar o pedido.",en:"Minimum total: $1 pcs. You have $2; $3 remaining. Add different models to complete the order.",nl:"Minimum totaal: $1 stuks. U heeft $2; nog $3. Combineer verschillende modellen om de bestelling compleet te maken."}],
  [/^Mínimo total: (\d+) pcs\. Alcanzaste el mínimo combinado de (\d+) unidades\.$/,
   {pt:"Mínimo total: $1 pcs. Você atingiu o mínimo combinado de $2 unidades.",en:"Minimum total: $1 pcs. You have reached the combined minimum of $2 units.",nl:"Minimum totaal: $1 stuks. U heeft het gecombineerde minimum van $2 stuks bereikt."}],
  [/^Total combinado: (\d+) de (\d+) pcs\. Faltan (\d+) unidades\. Podés combinar distintos modelos\.$/,
   {pt:"Total combinado: $1 de $2 pcs. Faltam $3 unidades. Você pode combinar diferentes modelos.",en:"Combined total: $1 of $2 pcs. $3 units remaining. You can combine different models.",nl:"Gecombineerd totaal: $1 van $2 stuks. Nog $3 stuks. U kunt verschillende modellen combineren."}],
  [/^Total combinado: (\d+) pcs\. Cumplís el mínimo de (\d+) unidades\.$/,
   {pt:"Total combinado: $1 pcs. Você atingiu o mínimo de $2 unidades.",en:"Combined total: $1 pcs. You meet the minimum of $2 units.",nl:"Gecombineerd totaal: $1 stuks. U voldoet aan het minimum van $2 stuks."}]
 ];
 for (const [pattern,translations] of dynamic) {
  const match=core.match(pattern);
  if(match){out=translations[language].replace(/\$(\d+)/g,(_,n)=>match[Number(n)]);return leading+out+trailing;}
 }
 return leading+out+trailing;
}
function translateTextNode(node) {
 const current=node.nodeValue;
 let source=originalText.get(node);
 if(source===undefined || current!==renderedText.get(node)) source=current;
 originalText.set(node,source);
 const next=translateString(source);
 if(next!==current) node.nodeValue=next;
 renderedText.set(node,next);
}
function translateAttribute(el,attr) {
 const current=el.getAttribute(attr);
 if(current===null)return;
 let sources=originalAttrs.get(el)||{}, rendered=renderedAttrs.get(el)||{};
 let source=sources[attr];
 if(source===undefined || current!==rendered[attr]) source=current;
 sources[attr]=source;
 const next=translateString(source);
 if(next!==current)el.setAttribute(attr,next);
 rendered[attr]=next;
 originalAttrs.set(el,sources);renderedAttrs.set(el,rendered);
}
function translateTree(root) {
 if(!root)return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 let node;
 while((node=walker.nextNode())){
  const parent=node.parentElement;
  if(parent && !parent.closest("script,style,textarea,noscript")) translateTextNode(node);
 }
 const elements=root.nodeType===1?[root,...root.querySelectorAll("*")]:[...root.querySelectorAll("*")];
 for(const el of elements) for(const attr of ["placeholder","title","aria-label","alt"]) translateAttribute(el,attr);
}
function syncCountryControls() {
 if(!activeCountry)return;
 for(const id of ["clientCountry","marketSelect"]){
  const select=document.getElementById(id);
  if(select && [...select.options].some(o=>o.value===activeCountry.code)) select.value=activeCountry.code;
 }
 const flag=document.querySelector("[data-usci-current-flag]");
 const name=document.querySelector("[data-usci-current-name]");
 if(flag)flag.textContent=activeCountry.flag;
 if(name){name.replaceChildren(document.createTextNode(activeCountry.name));translateTree(name);}
 document.querySelectorAll("[data-usci-select-country]").forEach(button=>{
  const selected=button.dataset.usciSelectCountry===activeCountry.code;
  button.classList.toggle("is-selected",selected);
  button.setAttribute("aria-pressed",selected?"true":"false");
 });
}
function applyLanguage() {
 document.documentElement.lang=({es:"es",pt:"pt-BR",en:"en-GY",nl:"nl-SR"})[language]||"es";
 document.title=translateString(initialTitle);
 if(descriptionMeta)descriptionMeta.setAttribute("content",translateString(initialDescription));
 translateTree(document.body);
 syncCountryControls();
}
function setPageInert(inert) {
 for(const child of document.body.children) if(child.id!=="usciCountryGate") child.inert=inert;
}
function openGate() {
 const gate=document.getElementById("usciCountryGate");
 if(!gate)return;
 gate.classList.add("is-open");
 gate.setAttribute("aria-hidden","false");
 const close=document.querySelector("[data-usci-close-country]");
 if(close)close.hidden=!activeCountry;
 document.body.style.overflow="hidden";
 setPageInert(true);
 const selected=gate.querySelector(".is-selected")||gate.querySelector("[data-usci-select-country]");
 if(selected)selected.focus({preventScroll:true});
}
function closeGate() {
 if(!activeCountry)return;
 const gate=document.getElementById("usciCountryGate");
 if(!gate)return;
 gate.classList.remove("is-open");
 gate.setAttribute("aria-hidden","true");
 document.body.style.overflow="";
 setPageInert(false);
}
function selectCountry(code) {
 const country=byCode.get(code);
 if(!country)return;
 activeCountry=country;language=country.lang;
 try{localStorage.setItem(STORAGE_KEY,code)}catch(e){}
 document.documentElement.dataset.usciCountry=code;
 applyLanguage();
 closeGate();
}
const savedCode=(()=>{try{return localStorage.getItem(STORAGE_KEY)||""}catch(e){return ""}})();
if(savedCode && byCode.has(savedCode)){
 activeCountry=byCode.get(savedCode);language=activeCountry.lang;
 document.documentElement.dataset.usciCountry=savedCode;
 applyLanguage();
 closeGate();
}else{
 document.documentElement.dataset.usciCountry="";
 language="es";
 const gate=document.getElementById("usciCountryGate");
 if(gate){gate.classList.add("is-open");gate.setAttribute("aria-hidden","false");}
 const close=document.querySelector("[data-usci-close-country]");
 if(close)close.hidden=true;
 document.body.style.overflow="hidden";
 setPageInert(true);
}
document.addEventListener("click",event=>{
 const pick=event.target.closest("[data-usci-select-country]");
 if(pick){selectCountry(pick.dataset.usciSelectCountry);return;}
 if(event.target.closest("[data-usci-open-country]")){openGate();return;}
 if(event.target.closest("[data-usci-close-country]"))closeGate();
});
document.addEventListener("change",event=>{
 const target=event.target;
 if(target && (target.id==="clientCountry"||target.id==="marketSelect") && byCode.has(target.value))selectCountry(target.value);
});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&activeCountry)closeGate();});
const observer=new MutationObserver(records=>{
 for(const record of records){
  if(record.type==="characterData")translateTextNode(record.target);
  if(record.type==="childList")record.addedNodes.forEach(node=>{
   if(node.nodeType===3)translateTextNode(node);
   else if(node.nodeType===1)translateTree(node);
  });
  if(record.type==="attributes" && record.target.nodeType===1)translateAttribute(record.target,record.attributeName);
 }
});
observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:["placeholder","title","aria-label","alt"]});
})();