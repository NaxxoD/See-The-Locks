export interface ValidationQuestion {
  question: string
  keywords: string[]
  hint: string
  successExplanation: string
}

export const validationQuestions: Record<number, ValidationQuestion[]> = {
  1: [
    {
      question:
        "Pourquoi 'Soleil123' est-il plus faible que 'K9#mP2$vX' meme longueur ?",
      keywords: ["previsible", "prévisible", "dictionnaire", "pattern", "mot", "connu", "simple", "commun", "evident", "évident", "facile", "deviner", "courant"],
      hint: "Pensez a la previsibilite du mot de passe...",
      successExplanation:
        "Exactement ! 'Soleil123' utilise un mot du dictionnaire suivi d'un pattern previsible. Un attaquant teste ces combinaisons en priorite.",
    },
    {
      question:
        "Entre 'paris2024' et 'x9K#mP2$v', lequel resiste mieux a une attaque ?",
      keywords: ["aleatoire", "aléatoire", "imprevisible", "imprévisible", "pattern", "simple", "commun", "connu", "facile", "deviner"],
      hint: "Quel mot de passe est le plus imprevisible pour un attaquant ?",
      successExplanation:
        "Bien vu ! 'x9K#mP2$v' est aleatoire et imprevisible, donc beaucoup plus resistant aux attaques.",
    },
    {
      question:
        "Tu as vu que 'test123' a une faible entropie. Pourquoi c'est faible ?",
      keywords: ["combinaisons", "peu", "simple", "faible", "commun", "evident", "évident", "facile", "deviner", "connu", "court"],
      hint: "Pensez au nombre de combinaisons possibles...",
      successExplanation:
        "Correct ! Peu de combinaisons possibles = l'attaquant a peu d'options a tester.",
    },
  ],
  2: [
    {
      question:
        "Pourquoi une attaque offline est plus dangereuse qu'une attaque online ?",
      keywords: ["rate limit", "vitesse", "limite", "blocage", "tentatives", "bloque", "restriction", "arret", "arrêt", "5 fois", "rapide", "illimite", "illimité"],
      hint: "Pensez aux limites imposees par le serveur en mode online...",
      successExplanation:
        "Parfait ! En online, le serveur bloque apres quelques tentatives. En offline, l'attaquant n'a aucune limite et teste des milliards de combinaisons.",
    },
    {
      question:
        "Quelle est la difference entre 5 tentatives (online) et 833 millions (offline) ?",
      keywords: ["limite", "blocage", "fichier", "local", "tentatives", "bloque", "restriction", "5 fois", "arret", "arrêt", "vitesse", "rapide"],
      hint: "Pourquoi l'attaquant peut-il faire autant de tentatives en offline ?",
      successExplanation:
        "Exact ! En offline, l'attaquant travaille en local sur le fichier vole, sans aucune limitation du serveur.",
    },
    {
      question:
        "Si un attaquant vole la base de donnees, pourquoi c'est pire qu'une tentative de connexion ?",
      keywords: ["offline", "fichier", "limite", "milliards", "tentatives", "bloque", "restriction", "vitesse", "rapide", "local", "illimite", "illimité"],
      hint: "Que se passe-t-il quand il n'y a plus de serveur entre l'attaquant et les mots de passe ?",
      successExplanation:
        "Bien ! Sans serveur intermediaire, l'attaquant teste des milliards de combinaisons par seconde sur sa propre machine.",
    },
  ],
  3: [
    {
      question:
        "Peut-on retrouver 'Bonjour' a partir de son hash SHA-256 ?",
      keywords: ["non", "impossible", "sens unique", "irreversible", "irréversible", "pas possible", "ne peut pas", "jamais", "aucun moyen", "on ne peut"],
      hint: "Quel est le principe fondamental d'un hash ?",
      successExplanation:
        "Exact ! Un hash est une fonction a sens unique : impossible de remonter de l'empreinte vers le texte original.",
    },
    {
      question:
        "Tu changes une lettre et le hash est totalement different. Pourquoi c'est important ?",
      keywords: ["unique", "empreinte", "detecte", "détecte", "modification", "integrite", "intégrité", "change", "different", "différent", "avalanche"],
      hint: "Pensez a l'integrite des donnees...",
      successExplanation:
        "Bien vu ! Cette propriete (effet avalanche) permet de detecter la moindre modification d'un message.",
    },
    {
      question:
        "Pourquoi les sites stockent le hash du mot de passe et pas le mot de passe lui-meme ?",
      keywords: ["protection", "fuite", "irreversible", "irréversible", "securite", "sécurité", "pas possible", "ne peut pas", "sens unique", "non", "impossible"],
      hint: "Que se passe-t-il si la base de donnees est volee ?",
      successExplanation:
        "Parfait ! Si la base fuit, l'attaquant n'a que les hashs (irreversibles) et pas les mots de passe en clair.",
    },
  ],
  4: [
    {
      question: "Quelle difference entre salt et pepper ?",
      keywords: ["unique", "utilisateur", "serveur", "commun", "secret", "different", "différent", "chaque", "personnel", "global", "partage", "partagé"],
      hint: "L'un est unique par utilisateur, l'autre est un secret partage...",
      successExplanation:
        "Exact ! Le salt est unique par utilisateur (stocke avec le hash), le pepper est un secret global du serveur.",
    },
    {
      question:
        "Pourquoi le salt empeche les rainbow tables de fonctionner ?",
      keywords: ["unique", "different", "différent", "precalculer", "précalculer", "table", "chaque", "personnel", "utilisateur"],
      hint: "Pensez a ce qui se passe quand chaque hash est unique...",
      successExplanation:
        "Bien vu ! Comme chaque utilisateur a un salt different, l'attaquant ne peut pas precalculer les hashs a l'avance.",
    },
    {
      question:
        "Deux utilisateurs ont le meme mot de passe 'password'. Ont-ils le meme hash avec un salt ?",
      keywords: ["non", "different", "différent", "unique", "salt", "pas le meme", "pas pareil", "chaque", "personnel"],
      hint: "Chaque utilisateur a son propre salt...",
      successExplanation:
        "Correct ! Grace au salt unique, meme mot de passe = hash different. C'est tout l'interet du salt.",
    },
  ],
  5: [
    {
      question:
        "Pourquoi Cesar et ROT13 ne protegent pas de vraies donnees ?",
      keywords: ["simple", "facilement", "cassable", "faible", "26", "rapide", "evident", "évident", "peu securise", "peu sécurisé", "pas securise", "trop simple", "casser"],
      hint: "Combien de cles possibles y a-t-il ?",
      successExplanation:
        "Exact ! Avec seulement 26 cles possibles, ces chiffrements se cassent en quelques secondes par force brute.",
    },
    {
      question: "Quelle est la difference entre hash et chiffrement ?",
      keywords: ["reversible", "réversible", "cle", "clé", "sens unique", "dechiffrer", "déchiffrer", "irreversible", "irréversible", "retour", "inverse"],
      hint: "L'un est irreversible, l'autre non...",
      successExplanation:
        "Parfait ! Le hash est a sens unique (irreversible), le chiffrement est reversible avec la bonne cle.",
    },
    {
      question:
        "Tu chiffres 2 fois avec ROT13 et le texte redevient normal. Pourquoi ?",
      keywords: ["reversible", "réversible", "annule", "13", "deux fois", "26", "retour", "revient", "inverse", "s'annule"],
      hint: "ROT13 decale de 13 positions. Que se passe-t-il avec 13+13 ?",
      successExplanation:
        "Bien vu ! 13 + 13 = 26 = taille de l'alphabet. Deux applications de ROT13 s'annulent.",
    },
  ],
  6: [
    {
      question:
        "Pourquoi bcrypt est plus securise que SHA-256 pour les mots de passe ?",
      keywords: ["lenteur", "iterations", "itérations", "ralentit", "lent", "temps", "100000", "boucle", "repete", "répète", "volontaire", "couteux", "coûteux"],
      hint: "Pensez a la vitesse de calcul...",
      successExplanation:
        "Exact ! bcrypt est volontairement lent (iterations), ce qui rend les attaques par force brute extremement couteuses.",
    },
    {
      question:
        "Pourquoi ajouter de la lenteur volontaire avec un KDF protege-t-il ?",
      keywords: ["temps", "ralentit", "iterations", "itérations", "milliards", "lent", "lenteur", "100000", "boucle", "repete", "répète", "couteux", "coûteux"],
      hint: "Quel est l'impact de la lenteur sur l'attaquant vs l'utilisateur ?",
      successExplanation:
        "Parfait ! La lenteur est negligeable pour l'utilisateur (+0.1s) mais catastrophique pour l'attaquant (milliards x 0.1s).",
    },
    {
      question:
        "Un KDF combine hash + salt + lenteur. Lequel ralentit l'attaquant ?",
      keywords: ["lenteur", "iterations", "itérations", "temps", "volontaire", "100000", "boucle", "repete", "répète", "lent", "ralentit"],
      hint: "Quel element du KDF rend l'attaque par force brute impraticable ?",
      successExplanation:
        "Bien vu ! C'est la lenteur volontaire (les iterations multiples) qui ralentit massivement l'attaquant.",
    },
  ],
}
