/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AddRecordModal from '@/components/AddRecordModal';
import { router } from 'expo-router';
import CarePlanShow from '@/components/CarePlanShow';

interface Record {
  id: string;
  type: string;
  createdOn: string;
  createdBy: {
    name: string;
    role: string;
  };
  tags?: string[];
  description?: string;
  attachments?: string[];
}

const sampleData: Record[] = [
  {
    id: '1',
    type: 'Refusals',
    createdOn: 'Tuesday, 7th January 2025, 14:01',
    createdBy: {
      name: 'Allan Felicity',
      role: 'Provider'
    },
    tags: ['COVID'],
    description: 'Refusals is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on',
    attachments: ['Screenshot 2024-12-26 100429.Png']
  },
  {
    id: '2',
    type: 'AHP',
    createdOn: 'Tuesday, 7th January 2025, 13:54',
    createdBy: {
      name: 'Allan Felicity',
      role: 'Provider'
    },
    tags: ['COVID'],
    description: 'he is gay',
    attachments: ['Screenshot 2025-01-07 093041.Png']
  }
];
type RecordCardProps = {
  record: Record;
  onUpdate: (updatedRecord: { id: any }) => void;
};

const RecordCard: React.FC<RecordCardProps> = ({ record, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  return (
    <>
    <View className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden">
      <TouchableOpacity 
        className="p-4"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            <View className="h-8 w-8 rounded-full bg-indigo-100 items-center justify-center mr-3">
              <Text className="text-indigo-600 font-JakartaSemiBold">
                {record.createdBy.name.charAt(0)}
              </Text>
            </View>
            <View>
              <Text className="text-base font-JakartaSemiBold text-gray-900">
                {record.createdBy.name}
              </Text>
              <Text className="text-sm font-JakartaLight text-gray-500">
                {record.createdBy.role}
              </Text>
            </View>
          </View>
          <TouchableOpacity className="p-2" onPress={() => setIsEditModalVisible(true)}>
            <Ionicons name="ellipsis-vertical" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Type and Date */}
        <View className="mb-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-JakartaSemiBold text-gray-900">
              {record.type}
            </Text>
            <Text className="text-sm font-JakartaLight text-gray-500">
              {record.createdOn}
            </Text>
          </View>
        </View>

        {/* Tags */}
        {record.tags && (
          <View className="flex-row flex-wrap gap-2 mb-2">
            {record.tags.map((tag, index) => (
              <View 
                key={index}
                className="bg-indigo-100 px-3 py-1 rounded-full"
              >
                <Text className="text-indigo-600 font-JakartaLight text-sm">{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Description */}
        {record.description && (
          <View>
            <Text 
              className="text-gray-600 font-JakartaLight" 
              numberOfLines={isExpanded ? undefined : 1}
            >
              {record.description}
            </Text>
            {!isExpanded && record.description.length > 100 && (
              <Text className="text-indigo-600 font-JakartaLight text-sm mt-1">Read more</Text>
            )}
          </View>
        )}
        {/* Attachments */}
        {record.attachments && record.attachments.length > 0 && (
          <View className="flex-row items-center mt-2">
            <Ionicons name="attach-outline" size={20} color="#6B7280" />
            <Text className="text-sm text-gray-600 font-JakartaLight ml-2">
              {record.attachments.length} attachment{record.attachments.length !== 1 ? 's' : ''}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Action Buttons */}
      {isExpanded && (
        <View className="flex-row border-t border-gray-100">
          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center py-3"
          >
            <Ionicons name="document-text-outline" size={18} color="#6B7280" />
            <Text className="text-sm font-JakartaLight text-gray-600 ml-2">Description</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center py-3"
          >
            <Ionicons name="attach-outline" size={18} color="#6B7280" />
            <Text className="text-sm font-JakartaLight text-gray-600 ml-2">Files</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-1 flex-row items-center justify-center py-3"
          >
            <Ionicons name="time-outline" size={18} color="#6B7280" />
            <Text className="text-sm font-JakartaLight text-gray-600 ml-2">History</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    <EditRecordModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        record={record}
        onSave={onUpdate}
      />
    </>
  );
};
type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: string[];
  selectedItems: string[];
  onSelectionChange: (selectedItems: string[]) => void;
  onClear: (selectedItems: string[]) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ 
  visible, 
  onClose, 
  title, 
  options, 
  selectedItems, 
  onSelectionChange,
  onClear
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = useMemo(() => {
    return options.filter((option: string) => 
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        className="flex-1 bg-black/30"
        activeOpacity={1}
        onPress={onClose}
      >
        <View className="mt-32 mx-4">
          <View className="bg-white rounded-xl overflow-hidden">
            {/* Header */}
            <View className="p-4 border-b border-gray-100">
              <Text className="text-lg font-JakartaSemiBold text-gray-900 mb-3">{title}</Text>
              
              {/* Search Input */}
              <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                <Ionicons name="search" size={18} color="#6B7280" />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder={`Search ${title.toLowerCase()}...`}
                  className="flex-1 ml-2 font-JakartaMedium text-gray-900"
                  placeholderTextColor="#6B7280"
                />
                {searchQuery !== "" && (
                  <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <Ionicons name="close-circle" size={18} color="#6B7280" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            
            {/* Options List */}
            {filteredOptions.length > 0 ? (
              <ScrollView 
                className="max-h-80"
                showsVerticalScrollIndicator={false}
              >
                {filteredOptions.map((option: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.Key | null | undefined) => (
                   <TouchableOpacity
                   key={option}
                   className="flex-row items-center px-4 py-3 border-b border-gray-100"
                   onPress={() => onSelectionChange(option)}
                 >
                   <View
                     className={`w-5 h-5 rounded border ${
                       selectedItems.includes(option) 
                         ? 'bg-indigo-600 border-indigo-600' 
                         : 'border-gray-300'
                     } mr-3 items-center justify-center`}
                   >
                     {selectedItems.includes(option) && (
                       <Ionicons name="checkmark" size={14} color="white" />
                     )}
                   </View>
                   <Text className="text-gray-700 font-JakartaMedium">{option}</Text>
                 </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View className="py-8 items-center">
                <Ionicons name="search-outline" size={24} color="#6B7280" />
                <Text className="text-gray-500 font-JakartaSemiBold mt-2">No results found</Text>
              </View>
            )}


            {/* Action Buttons */}
            <View className="p-4 flex-row justify-between border-t border-gray-100">
              <View className="flex-row items-center">
                <Text className="text-gray-600 font-JakartaLight">
                  {selectedItems.length} selected
                </Text>
                {selectedItems.length > 0 && (
                  <TouchableOpacity 
                    className="ml-2 px-2 py-1 rounded bg-gray-100"
                    onPress={onClear}> 
                    <Text className="text-gray-600 font-JakartaLight">Clear</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View className="flex-row gap-2">
                <TouchableOpacity 
                  className="px-4 py-2 rounded-lg bg-gray-100"
                  onPress={onClose}
                >
                  <Text className="text-gray-600 font-JakartaLight">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="px-4 py-2 rounded-lg bg-indigo-600"
                  onPress={onClose}
                >
                  <Text className="text-white font-JakartaLight">Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
const EditRecordModal = ({ visible, onClose, record, onSave }: { visible: boolean; onClose: () => void; record: any; onSave: (record: any) => void }) => {
  const [editedRecord, setEditedRecord] = useState(record);

  const handleSave = () => {
    onSave(editedRecord);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/30">
        <View className="mt-20 mx-4 bg-white rounded-xl overflow-hidden flex-1 mb-4">
          {/* Header */}
          <View className="p-4 border-b border-gray-100 flex-row justify-between items-center">
            <Text className="text-xl font-JakartaSemiBold text-gray-900">Edit Record</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
            {/* Type */}
            <View className="mb-4">
              <Text className="text-sm font-JakartaMedium text-gray-700 mb-1">Type</Text>
              <TextInput
                value={editedRecord.type}
                onChangeText={(text) => setEditedRecord({...editedRecord, type: text})}
                className="border border-gray-200 rounded-lg font-JakartaMedium px-3 py-2 text-gray-900"
              />
            </View>

            {/* Description */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">Description</Text>
              <TextInput
                value={editedRecord.description}
                onChangeText={(text) => setEditedRecord({...editedRecord, description: text})}
                multiline
                numberOfLines={4}
                className="border border-gray-200 font-JakartaMedium rounded-lg px-3 py-2 text-gray-900"
                textAlignVertical="top"
              />
            </View>

            {/* Tags */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</Text>
              <TextInput
                value={editedRecord.tags?.join(', ')}
                onChangeText={(text) => {
                  const tagsArray = text.split(',').map(tag => tag.trim()).filter(tag => tag);
                  setEditedRecord({...editedRecord, tags: tagsArray});
                }}
                className="border border-gray-200 font-JakartaMedium rounded-lg px-3 py-2 text-gray-900"
              />
            </View>

            {/* Attachments List */}
            <View className="mb-4">
              <Text className="text-sm font-JakartaMedium text-gray-700 mb-1">Attachments</Text>
              {editedRecord.attachments?.map((attachment: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                <View key={index} className="flex-row items-center mb-2">
                  <Ionicons name="document-outline" size={20} color="#6B7280" />
                  <Text className="ml-2 flex-1 text-gray-600">{attachment}</Text>
                  <TouchableOpacity 
                    onPress={() => {
                      if (typeof index === 'number') {
                        const newAttachments = [...editedRecord.attachments];
                        newAttachments.splice(index, 1);
                        setEditedRecord({...editedRecord, attachments: newAttachments});
                      }
                    }}
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View className="p-4 border-t border-gray-100 flex-row justify-end gap-2">
            <TouchableOpacity 
              className="px-4 py-2 rounded-lg bg-gray-100"
              onPress={onClose}
            >
              <Text className="text-gray-600 font-JakartaLight">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="px-4 py-2 rounded-lg bg-indigo-600"
              onPress={handleSave}
            >
              <Text className="text-white font-JakartaMedium">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const DATE_RANGES = [
  { label: 'Last 7 days', value: '7' },
  { label: 'Last 14 days', value: '14' },
  { label: 'Last 30 days', value: '30' },
  { label: 'Last 180 days', value: '180' },
  { label: 'Custom range', value: 'custom' },
  { label: 'All time', value: 'all' }
];

const DailyRecords: React.FC = () => {
  const [authorFilterVisible, setAuthorFilterVisible] = useState(false);
  const [typeFilterVisible, setTypeFilterVisible] = useState(false);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [records, setRecords] = useState(sampleData);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [selectedRange, setSelectedRange] = useState('7');
  const [showRangeSelector, setShowRangeSelector] = useState(false);
  


  const authors = [...new Set(sampleData.map(record => record.createdBy.name))];
  const types = [...new Set(sampleData.map(record => record.type))];

  const handleAuthorSelection = (author: string) => {
    setSelectedAuthors(prev => 
      prev.includes(author)
        ? prev.filter(a => a !== author)
        : [...prev, author]
    );
  };

  const handleTypeSelection = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleClearAuthors = (selectedItems: string[]) => {
    setSelectedAuthors([]);
  };
  
  const handleClearTypes = (selectedItems: string[]) => {
    setSelectedTypes([]);
  };
  const handleUpdateRecord = (updatedRecord: { id: any; type: string; createdOn: string; createdBy: { name: string; role: string; }; }) => {
    setRecords((prevRecords: Record[]) => 
      prevRecords.map((record: Record) => 
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
  };

  const filteredRecords = sampleData.filter(record => {
    const authorMatch = selectedAuthors.length === 0 || selectedAuthors.includes(record.createdBy.name);
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(record.type);
    const descriptionMatch = record.description?.toLowerCase().includes(searchQuery.toLowerCase()); 
    return authorMatch && typeMatch && (searchQuery === '' || descriptionMatch);
  });
  const [isCarePlanVisible, setIsCarePlanVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-4 py-3 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-2xl font-JakartaBold text-gray-900">
            Daily Records
          </Text>
          <TouchableOpacity
            className="bg-indigo-600 px-4 py-2.5 rounded-lg flex-row items-center"
            onPress={() => setShowAddRecord(true)}
          >
            <Ionicons name="add" size={20} color="white" />
            <Text className="text-white font-JakartaMedium ml-1">
              Add Record
            </Text>
          </TouchableOpacity>
        </View>

        <AddRecordModal
        visible={showAddRecord}
        onClose={() => setShowAddRecord(false)}
         onSubmit={(record) => {
        console.log(record);
        }}
         userName="John Doe"
         userRole="Provider"
        />

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-3xl px-3 py-2 mb-2">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            placeholder="Search in daily records..."
            className="flex-1 font-JakartaMedium ml-2 text-gray-900"
            placeholderTextColor="#6B7280"
            value={searchQuery} 
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Buttons */}
        <View className="flex-row gap-2">
        <TouchableOpacity 
            className={`px-4 py-3 rounded-lg flex-row items-center ${
              selectedAuthors.length > 0 ? 'bg-indigo-100' : 'bg-gray-100'
            }`}
            onPress={() => setAuthorFilterVisible(true)}
          >
            <Ionicons 
              name="person-outline" 
              size={18} 
              color={selectedAuthors.length > 0 ? '#4F46E5' : '#6B7280'} 
            />
            <Text className={`ml-2 ${
              selectedAuthors.length > 0 ? 'text-indigo-600 font-JakartaMedium' : 'text-gray-600 font-JakartaMedium'
            }`}>
              {selectedAuthors.length > 0 
                ? `${selectedAuthors.length} selected`
                : 'Filter by author'
              }
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className={`px-4 py-2 rounded-lg flex-row items-center ${
              selectedTypes.length > 0 ? 'bg-indigo-100' : 'bg-gray-100'
            }`}
            onPress={() => setTypeFilterVisible(true)}
          >
            <Ionicons 
              name="filter-outline" 
              size={18} 
              color={selectedTypes.length > 0 ? '#4F46E5' : '#6B7280'} 
            />
            <Text className={`ml-2 ${
              selectedTypes.length > 0 ? 'text-indigo-600 font-JakartaMedium' : 'text-gray-600 font-JakartaMedium'
            }`}>
              {selectedTypes.length > 0 
                ? `${selectedTypes.length} selected`
                : 'Filter by type'
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`px-3 py-2 rounded-lg ${
              selectedRange !== '7' ? 'bg-indigo-100' : 'bg-gray-100'
            } items-center justify-center`}
            onPress={() => setShowRangeSelector(true)}
          >
            <Ionicons 
              name="calendar-outline" 
              size={18} 
              color={selectedRange !== '7' ? '#4F46E5' : '#6B7280'} 
            />
          </TouchableOpacity>
        </View>
      </View>
        {/* Date Range Modal */}
        <Modal
        visible={showRangeSelector}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRangeSelector(false)}
      >
        <View className="flex-1 bg-black/30">
          <View className="mt-auto bg-white rounded-t-xl">
            <View className="p-4 border-b border-gray-100">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-xl font-JakartaSemiBold">Select Date Range</Text>
                <TouchableOpacity onPress={() => setShowRangeSelector(false)}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView className="max-h-80">
              {DATE_RANGES.map((range) => (
                <TouchableOpacity
                  key={range.value}
                  className="flex-row items-center px-4 py-4 border-b border-gray-100"
                  onPress={() => {
                    setSelectedRange(range.value);
                    setShowRangeSelector(false);
                  }}
                >
                  <View className={`w-5 h-5 rounded-full border ${
                    selectedRange === range.value 
                      ? 'bg-indigo-600 border-indigo-600' 
                      : 'border-gray-300'
                  } mr-3 items-center justify-center`}>
                    {selectedRange === range.value && (
                      <Ionicons name="checkmark" size={14} color="white" />
                    )}
                  </View>
                  <Text className="text-gray-900 font-JakartaMedium">{range.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Records List */}
      <ScrollView className="flex-1 px-4 pt-3" contentContainerStyle={{ paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      {filteredRecords.map((record) => (
          <RecordCard 
            key={record.id} 
            record={record}
            onUpdate={handleUpdateRecord}
          />
        ))}
      </ScrollView>
      <FilterModal
        visible={authorFilterVisible}
        onClose={() => setAuthorFilterVisible(false)}
        title="Filter by Author"
        options={authors}
        selectedItems={selectedAuthors}
        onSelectionChange={handleAuthorSelection}
        onClear={handleClearAuthors}
      />

      <FilterModal
        visible={typeFilterVisible}
        onClose={() => setTypeFilterVisible(false)}
        title="Filter by Type"
        options={types}
        selectedItems={selectedTypes}
        onSelectionChange={handleTypeSelection}
        onClear={handleClearTypes}
      />

      {/* Generate Summary Button */}
      <View className="absolute bottom-24 right-4">
        <TouchableOpacity 
          className="bg-indigo-600 w-12 h-12 rounded-full items-center justify-center shadow-lg"
        >
          <Ionicons name="sparkles" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <CarePlanShow visible={isCarePlanVisible} onClose={() => setIsCarePlanVisible(false)} />
       {/* Bottom Navigation */}
       <View className="flex-row justify-between p-4 bg-white border-t border-gray-200">
        <TouchableOpacity 
          className="px-6 border border-indigo-600 rounded-l-xl py-3  mr-1"
          onPress={() => router.push('/(root)/(tabs)/daily-records')}
        >
          <View className="flex-row items-center justify-center">
            <Text className=" font-medium ml-2">DR</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          className="px-6 border border-indigo-600 rounded-r-xl py-3  ml-1"
          onPress={() => setIsCarePlanVisible(true)}
        >
          <View className="flex-row items-center justify-center">
            <Text className=" font-medium ml-2">CP</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DailyRecords;