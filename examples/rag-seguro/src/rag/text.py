"""Normalización común a todos los buscadores."""
import re, unicodedata

STOP = set("de la el en y a los las del se que por un una con para al lo como su es no o u e sus este esta son si más mas ni".split())


def norm(s: str) -> str:
    s = unicodedata.normalize("NFD", s.lower())
    return "".join(c for c in s if unicodedata.category(c) != "Mn")


def tokens(s: str) -> list[str]:
    out = []
    for t in re.findall(r"[a-z0-9]+", norm(s)):
        if t in STOP or len(t) < 2:
            continue
        if len(t) > 4:
            t = re.sub(r"(es|s)$", "", t)  # plural muy simple
        out.append(t)
    return out
