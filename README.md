# See The Locks

Outil interactif pour apprendre la cryptographie appliquée aux mots de passe : entropie, hashage, salt, chiffrement et fonctions de dérivation de clé (KDF).

Projet académique, réalisé sans écriture manuelle du code : l'interface a été générée avec l'outil v0 (génération par IA), puis relue et testée.

Chaque niveau montre un concept, puis le fait manipuler. Par exemple, on voit pourquoi un hash SHA-256 simple se casse très vite, et pourquoi bcrypt ou Argon2 sont plus lents à calculer par design.

## Niveaux

- **Encodage** et **hashage** : différence entre transformer une donnée et la rendre irréversible.
- **Mots de passe** : longueur, classes de caractères, entropie, et pourquoi un mot de passe « fort » ne l'est pas toujours.
- **Salt et pepper** : ce qui se passe quand une base de hashs est volée.
- **Chiffrement** : le chiffrement de César, pour comprendre la notion de clé.
- **KDF** : hash répété, bcrypt et Argon2, et le temps nécessaire pour casser un mot de passe.

## Lancement

**Prérequis :** Node.js 20+ et pnpm (ou npm).

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS et composants shadcn/ui

## Licence

Aucune licence : tous droits réservés.
