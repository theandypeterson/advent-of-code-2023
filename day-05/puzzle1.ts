import * as fs from "fs";

interface Almanac {
  source: number[];
  mappings: Mapping[][];
}

interface Mapping {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
}
const getAlamanac = (filename: string): Almanac => {
  const almanac = fs.readFileSync(filename, "utf-8");
  // Process the almanac data here
  const lines = almanac.split("\n");
  const [seedsLine, _emptyLine, ...rest] = lines;
  const seeds = seedsLine
    .split(":")[1]
    .trim()
    .split(" ")
    .map((s) => parseInt(s));

  const mappings: Mapping[][] = [];
  let mappingList: Mapping[] = [];
  for (const line of rest) {
    if (line.includes(":")) {
      continue;
    } else if (line.trim() === "") {
      mappings.push(mappingList);
      mappingList = [];
      continue;
    }
    const [destinationRangeStart, sourceRangeStart, rangeLength] = line
      .trim()
      .split(" ")
      .filter((s) => s !== "")
      .map((s) => parseInt(s));
    const mapping: Mapping = {
      destinationRangeStart,
      sourceRangeStart,
      rangeLength,
    };
    mappingList.push(mapping);
  }
  return {
    source: seeds,
    mappings,
  };
};

const mapSourceToDestination = (
  source: number,
  mappings: Mapping[]
): number => {
  const mapping = mappings.find((m) => {
    return (
      source >= m.sourceRangeStart &&
      source < m.sourceRangeStart + m.rangeLength
    );
  });
  if (!mapping) {
    return source;
  }
  return source - (mapping.sourceRangeStart - mapping.destinationRangeStart);
};

const processAlamanac = (almanac: Almanac): number[] => {
  return almanac.source.map((s) => {
    return almanac.mappings.reduce((acc, m) => {
      const destination = mapSourceToDestination(acc, m);
      return destination;
    }, s);
  });
};

const almanac = getAlamanac("almanac.txt");
const minimum = Math.min(...processAlamanac(almanac));
console.log("minimum", minimum);
