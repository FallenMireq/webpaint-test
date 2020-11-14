import { LineHistoryEntry } from './LineHistoryEntry.js';

export class HistryEntryDeserializer {
    static deserialize(entries) {
        return entries
            .map((x) => {
                switch (x.line) {
                    case 'line':
                        return new LineHistoryEntry(x);
                    default:
                        return null;
                }
            })
            .filter((x) => !!x);
    }
}
