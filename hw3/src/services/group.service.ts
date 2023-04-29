import GroupRepository from "../data-access/group.repository";
import Group, { GroupAttributes } from "../models/group.model";

class GroupService {
  async getGroupById(id: number): Promise<Group | null> {
    return GroupRepository.findById(id);
  }

  async createGroup(group: GroupAttributes): Promise<Group> {
    return GroupRepository.create(group);
  }

  async updateGroup(id: number, group: GroupAttributes): Promise<number> {
    return GroupRepository.update(id, group);
  }

  async deleteGroup(id: number): Promise<number> {
    return GroupRepository.delete(id);
  }
}

export default new GroupService();
